import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PAYSTACK_PUBLIC_KEY } from '../services/api';

const usePaystack = (customerEmail, deliveryInfo = {}) => {
  const { total, cart } = useCart();
  const { user } = useAuth();

  const startPayment = () => {
    if (total <= 0) { alert('Your cart is empty!'); return; }

    const reference = `GR-${Date.now()}`;

    // Save order details to localStorage before redirect
    localStorage.setItem('pendingOrder', JSON.stringify({
      reference,
      total,
      items: cart,
      phone: deliveryInfo.phone,
      address: `${deliveryInfo.address}, ${deliveryInfo.city}, ${deliveryInfo.state}`
    }));

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: customerEmail || user?.email,
      amount: total * 100,
      currency: 'NGN',
      ref: reference,
      channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
      onClose: () => alert('Payment cancelled'),
      callback: (response) => {
        window.location.href = `/payment/verify?reference=${response.reference}`;
      }
    });

    handler.openIframe();
  };

  return { startPayment };
};

export default usePaystack;
