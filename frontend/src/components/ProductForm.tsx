import React, { useState } from 'react';
import { createProduct } from '../services/api';

const ProductForm = () => {
  const [productId, setProductId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = { productId };
    try {
      await createProduct(productData);
      alert('Product created successfully');
    } catch (error) {
      alert('Error creating product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>
      <input
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Product ID"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Create Product
      </button>
    </form>
  );
};

export default ProductForm;
