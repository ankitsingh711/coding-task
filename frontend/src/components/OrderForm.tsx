import React, { useState } from 'react';
import { createOrder } from '../services/api';

const OrderForm = () => {
  const [orderID, setOrderID] = useState('');
  const [productId, setProductId] = useState('');
  const [orderedOn, setOrderedOn] = useState('');
  const [userId, setUserId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = { orderID, productId, orderedOn, userId };
    try {
      await createOrder(orderData);
      alert('Order created successfully');
    } catch (error) {
      alert('Error creating order');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Order</h2>
      <input
        value={orderID}
        onChange={(e) => setOrderID(e.target.value)}
        placeholder="Order ID"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        value={orderedOn}
        onChange={(e) => setOrderedOn(e.target.value)}
        placeholder="Ordered On"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Create Order
      </button>
    </form>
  );
};

export default OrderForm;
