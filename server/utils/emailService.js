const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOrderConfirmation = async (email, name, order) => {
  try {
    const itemsHTML = order.items.map(item => `<tr><td style="padding:8px">${item.name}</td><td style="padding:8px">${item.quantity}</td><td style="padding:8px">₦${Number(item.price).toLocaleString()}</td></tr>`).join('');
    await transporter.sendMail({
      from: `"Gozy Resources" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Confirmed - ${order.trackingId}`,
      html: `<div style="font-family:Georgia,serif;max-width:600px;margin:auto"><div style="background:#001F3F;padding:30px;text-align:center"><h1 style="color:#D4AF37;margin:0">GOZY RESOURCES</h1></div><div style="padding:30px"><h2 style="color:#001F3F">Thank you, ${name}!</h2><p>Your order has been confirmed.</p><p><strong>Tracking ID:</strong> ${order.trackingId}</p><p><strong>Address:</strong> ${order.address}</p><table style="width:100%;border-collapse:collapse">${itemsHTML}</table><p style="color:#D4AF37;font-weight:bold">Total: ₦${Number(order.total).toLocaleString()}</p></div></div>`
    });
  } catch(e) { console.error('Email error:', e.message); }
};

const sendPaymentConfirmation = async (email, name, order) => {
  try {
    await transporter.sendMail({
      from: `"Gozy Resources" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Payment Received - ₦${Number(order.total).toLocaleString()}`,
      html: `<div style="font-family:Georgia,serif;max-width:600px;margin:auto"><div style="background:#001F3F;padding:30px;text-align:center"><h1 style="color:#D4AF37;margin:0">GOZY RESOURCES</h1></div><div style="padding:30px"><h2 style="color:#001F3F">Payment Confirmed ✓</h2><p>Hi ${name}, we received your payment of <strong style="color:#D4AF37">₦${Number(order.total).toLocaleString()}</strong>.</p><p><strong>Tracking ID:</strong> ${order.trackingId}</p><p><strong>Reference:</strong> ${order.reference}</p></div></div>`
    });
  } catch(e) { console.error('Email error:', e.message); }
};

const sendStatusUpdate = async (email, name, order) => {
  try {
    const statusMessages = {
      processing: 'Your order is being processed and will be dispatched soon.',
      out_for_delivery: `Your order is on its way! ${order.rider?.name ? `Rider: ${order.rider.name} (${order.rider.phone}).` : ''} ${order.deliveryCode ? `Delivery code: <strong style="color:#D4AF37">${order.deliveryCode}</strong> - give this to your rider.` : ''}`,
      delivered: 'Your order has been delivered. Thank you for shopping with Gozy Resources!',
      cancelled: 'Your order has been cancelled. Contact us if you have questions.'
    };
    const msg = statusMessages[order.status];
    if (!msg) return;
    await transporter.sendMail({
      from: `"Gozy Resources" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Order Update - ${order.trackingId}`,
      html: `<div style="font-family:Georgia,serif;max-width:600px;margin:auto"><div style="background:#001F3F;padding:30px;text-align:center"><h1 style="color:#D4AF37;margin:0">GOZY RESOURCES</h1></div><div style="padding:30px"><h2 style="color:#001F3F">Hi ${name},</h2><p>${msg}</p><p><strong>Tracking ID:</strong> ${order.trackingId}</p><p><strong>Status:</strong> <span style="color:#D4AF37;text-transform:uppercase">${order.status.replace(/_/g,' ')}</span></p></div></div>`
    });
  } catch(e) { console.error('Email error:', e.message); }
};

module.exports = { sendOrderConfirmation, sendPaymentConfirmation, sendStatusUpdate };
