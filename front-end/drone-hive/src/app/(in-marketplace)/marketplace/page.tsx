"use client";

import { useRouter } from "next/navigation";

const Marketplace = () => {
  const router = useRouter();


  return (
    <>
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Available Drones</h2>
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
    </>
  );
};

export default Marketplace;
