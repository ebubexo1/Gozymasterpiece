/**
 * Formats numbers to Nigerian Naira
 */
const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(amount);
};

/**
 * Calculates the total of the cart
 */
const calculateCartTotal = (cartItems) => {
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};

/**
 * Generates a unique transaction reference for Paystack
 */
const generateReference = () => {
  return `LX-${Math.floor(Math.random() * 1000000000 + 1)}`;
};

// EXPORT UNDER THE CODE
export { formatPrice, calculateCartTotal, generateReference };