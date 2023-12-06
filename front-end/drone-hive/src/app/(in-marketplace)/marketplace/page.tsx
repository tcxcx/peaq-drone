'use client';

import { useRouter } from 'next/navigation';
import useWalletStore from '@/hooks/context/useWalletStore';
import { useEffect } from 'react';

const Marketplace = () => {
  const router = useRouter();
  const { walletAddress, jwtToken } = useWalletStore();

  useEffect(() => {
    // Redirect if not authenticated
    if (!walletAddress || !jwtToken) {
      router.push('/log-in');
    }
  }, [walletAddress, jwtToken, router]);

  return (
    <div className="container mx-auto p-4 z-10">
      <header className="flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold">Marketplace Dashboard</h1>
        <span className="text-sm">Connected as: {walletAddress}</span>
      </header>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Available Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Placeholder for marketplace items */}
          {[1, 2, 3].map((item) => (
            <div key={item} className="border rounded-lg p-4 shadow-sm">
              <h3 className="font-bold text-lg">Item {item}</h3>
              <p className="text-gray-600">Description of item {item}...</p>
              <button className="mt-2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-900 transition duration-300">
                Buy Item
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Your Activities</h2>
        {/* Placeholder for user activities */}
        <div className="border rounded-lg p-4 shadow-sm">
          <p>Your recent activities will appear here...</p>
        </div>
      </section>
    </div>
  );
};

export default Marketplace;
