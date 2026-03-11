const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendOrderConfirmation = async (email, name, order) => {
  try {
    const itemsHTML = order.items.map(item => `<tr><td style="padding:8px">${item.name}</td><td style="padding:8px">${item.quantity}</td><td style="padding:8px">₦${Number(item.price).toLocaleString()}</td></tr>`).join('');
    await resend.emails.send({
      from: 'Gozy Resources <onboarding@resend.dev>',
      to: email,
      subject: `Order Confirmed - ${order.trackingId}`,
      html: `<div style="font-family:Georgia,serif;max-width:600px;margin:auto"><div style="background:#001F3F;padding:30px;text-align:center"><h1 style="color:#D4AF37;margin:0">GOZY RESOURCES</h1></div><div style="padding:30px"><h2 style="color:#001F3F">Thank you, ${name}!</h2><p>Your order has been confirmed.</p><p><strong>Tracking ID:</strong> ${order.trackingId}</p><p><strong>Address:</strong> ${order.address}</p><table style="width:100%;border-collapse:collapse">${itemsHTML}</table><p style="color:#D4AF37;font-weight:bold">Total: ₦${Number(order.total).toLocaleString()}</p></div></div>`
    });
  } catch(e) { console.error('Email error:', e.message); }
};

const sendPaymentConfirmation = async (email, name, order) => {
  try {
    await resend.emails.send({
      from: 'Gozy Resources <onboarding@resend.dev>',
      to: email,
      subject: `Payment Received - ₦${Number(order.total).toLocaleString()}`,
      html: `<div style="font-family:Georgia,serif;max-width:600px;margin:auto"><div style="background:#001F3F;padding:30px;text-align:center"><h1 style="color:#D4AF37;margin:0">GOZY RESOURCES</h1></div><div style="padding:30px"><h2 style="color:#001F3F">Payment Confirmed ✓</h2><p>Hi ${name}, we received your payment of <strong style="color:#D4AF37">₦${Number(order.total).toLocaleString()}</strong>.</p><p><strong>Tracking ID:</strong> ${order.trackingId}</p></div></div>`
    });
  } catch(e) { console.error('Email error:', e.message); }
};

const sendStatusUpdate = async (email, name, order) => {
  try {
    const statusMessages = {
      processing: 'Your order is being processed and will be dispatched soon.',
      out_for_delivery: `Your order is on its way! ${order.deliveryCode ? `Delivery code: <strong>${order.deliveryCode}</strong>` : ''}`,
      delivered: 'Your order has been delivered. Thank you for shopping with Gozy Resources!',
      cancelled: 'Your order has been cancelled. Contact us if you have questions.'
    };
    const msg = statusMessages[order.status];
    if (!msg) return;
    await resend.emails.send({
      from: 'Gozy Resources <onboarding@resend.dev>',
      to: email,
      subject: `Order Update - ${order.trackingId}`,
      html: `<div style="font-family:Georgia,serif;max-width:600px;margin:auto"><div style="background:#001F3F;padding:30px;text-align:center"><h1 style="color:#D4AF37;margin:0">GOZY RESOURCES</h1></div><div style="padding:30px"><h2 style="color:#001F3F">Hi ${name},</h2><p>${msg}</p><p><strong>Tracking ID:</strong> ${order.trackingId}</p><p><strong>Status:</strong> <span style="color:#D4AF37;text-transform:uppercase">${order.status.replace(/_/g,' ')}</span></p></div></div>`
    });
  } catch(e) { console.error('Email error:', e.message); }
};

const sendPasswordReset = async (email, name, token) => {
  try {
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${token}`;
    await resend.emails.send({
      from: 'Gozy Resources <onboarding@resend.dev>',
      to: email,
      subject: 'Reset Your Password - Gozy Resources',
      html: `<div style="font-family:Georgia,serif;max-width:600px;margin:auto"><div style="background:#001F3F;padding:30px;text-align:center"><h1 style="color:#D4AF37;margin:0">GOZY RESOURCES</h1></div><div style="padding:30px"><h2 style="color:#001F3F">Hi ${name},</h2><p>You requested a password reset. Click the button below.</p><div style="text-align:center;margin:30px 0"><a href="${resetURL}" style="background:#001F3F;color:#D4AF37;padding:14px 30px;text-decoration:none;font-size:14px;letter-spacing:2px;text-transform:uppercase">Reset Password</a></div><p style="font-size:13px;color:#666">This link expires in 1 hour.</p></div></div>`
    });
  } catch(e) { console.error('Reset email error:', e.message); }
};

module.exports = { sendOrderConfirmation, sendPaymentConfirmation, sendStatusUpdate, sendPasswordReset };
