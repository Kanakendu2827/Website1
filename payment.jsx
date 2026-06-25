import React, { useState } from 'https://esm.sh/react@18?dev';
import ReactDOM from 'https://esm.sh/react-dom@18/client?dev';

const e = React.createElement;

function PaymentPage() {
  const [method, setMethod] = useState('credit-card');
  const [form, setForm] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
    setForm({ cardNumber: '', expiry: '', cvv: '', name: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedMethod = method === 'upi' ? 'UPI' : method.replace('-', ' ');
    alert(`Payment method selected: ${selectedMethod}. Payment submission simulated.`);
  };

  const paymentRadio = ['credit-card', 'debit-card', 'upi'].map((value) => {
    const labelText = value === 'upi' ? 'UPI' : value === 'credit-card' ? 'Credit Card' : 'Debit Card';
    return e(
      'label',
      { key: value },
      e('input', {
        type: 'radio',
        name: 'payment-method',
        value,
        checked: method === value,
        onChange: handleMethodChange
      }),
      ` ${labelText}`
    );
  });

  const cardSection = e(
    'div',
    { className: 'payment-section card-section' },
    e('h2', null, method === 'credit-card' ? 'Credit Card Payment' : 'Debit Card Payment'),
    e(
      'form',
      { onSubmit: handleSubmit },
      e('input', {
        type: 'text',
        name: 'cardNumber',
        placeholder: 'Card Number',
        value: form.cardNumber,
        onChange: handleInputChange,
        required: true
      }),
      e('input', {
        type: 'text',
        name: 'expiry',
        placeholder: 'Expiry Date (MM/YY)',
        value: form.expiry,
        onChange: handleInputChange,
        required: true
      }),
      e('input', {
        type: 'text',
        name: 'cvv',
        placeholder: 'CVV',
        value: form.cvv,
        onChange: handleInputChange,
        required: true
      }),
      e('input', {
        type: 'text',
        name: 'name',
        placeholder: 'Cardholder Name',
        value: form.name,
        onChange: handleInputChange,
        required: true
      }),
      e('button', { type: 'submit' }, 'Pay Now')
    )
  );

  const upiSection = e(
    'div',
    { className: 'payment-section upi-section' },
    e('h2', null, 'UPI Payment'),
    e('p', null, 'Scan the QR code below to make your payment securely.'),
    e(
      'div',
      { className: 'qr-code' },
      e('img', { src: 'qr.jpg', alt: 'Payment QR Code' })
    ),
    e(
      'div',
      { className: 'instructions' },
      e('p', null, 'Use your preferred UPI app (e.g., Google Pay, PhonePe, Paytm) to scan and pay.'),
      e('p', null, 'After payment, send a screenshot to our support for confirmation.')
    )
  );

  return e(
    'div',
    { className: 'payment-container' },
    e('h1', null, 'Complete Your Payment'),
    e('p', null, 'Select your payment method below.'),
    e('div', { className: 'payment-methods' }, paymentRadio),
    method !== 'upi' ? cardSection : upiSection,
    e('a', { href: 'store.html', className: 'back-btn' }, 'Back to Store')
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(e(PaymentPage));
