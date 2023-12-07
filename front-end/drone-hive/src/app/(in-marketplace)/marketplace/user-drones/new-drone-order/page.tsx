'use client';

import React, { useState } from 'react';
import axios from 'axios';
import useWalletStore from '@/hooks/context/useWalletStore';

const NewOrder: React.FC = () => {
  const { walletAddress } = useWalletStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!walletAddress) {
      alert('Wallet address is not available');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/drone-listing', {
        ownerWalletAddress: walletAddress,
        title,
        description,
      });

      console.log(response.data); // handle response
      setTitle('');
      setDescription('');
      alert('Drone registered successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to register drone');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glassmorphism p-8 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-2xl font-semibold mb-6">Register a New Drone</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Title:</label>
            <input
              type="text"
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-300">Description:</label>
            <textarea
              className="w-full px-3 py-2 bg-gray-700 text-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
          >
            Submit New Drone
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewOrder;
