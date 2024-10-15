import React, { useState } from 'react';
import { createUser } from '../services/api';

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = { username, address, phoneNumber, emailAddress };
    try {
      await createUser(userData);
      alert('User created successfully');
    } catch (error) {
      alert('Error creating user');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Create User</h2>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <input
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        placeholder="Email"
        className="w-full p-2 mb-4 border border-gray-300 rounded"
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Create User
      </button>
    </form>
  );
};

export default UserForm;
