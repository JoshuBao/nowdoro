// src/pages/payment.tsx
'use client'
import { useState } from 'react';

const PaymentPage = () => {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setLoading(false);
        console.error('Failed to create checkout session');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="w-full max-w-md p-8 space-y-6 bg-base-100 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary">Buy Cool New Product</h2>
        <div className="product">
          <img src="https://i.imgur.com/EHyR2nP.png" alt="The cover of Stubborn Attachments" />
          <div className="description">
            <h3>Stubborn Attachments</h3>
            <h5>$20.00</h5>
          </div>
        </div>
        <button
          className="btn btn-primary w-full"
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
