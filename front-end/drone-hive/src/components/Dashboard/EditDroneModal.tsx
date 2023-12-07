import React, { useState } from 'react';

interface Drone {
  droneId: string;
  title: string;
  description: string;
}

interface EditDroneModalProps {
  drone: Drone;
  onClose: () => void;
  onSave: (droneId: string, updatedData: { title: string; description: string }) => void;
}

export const EditDroneModal: React.FC<EditDroneModalProps> = ({ drone, onClose, onSave }) => {
  const [title, setTitle] = useState(drone.title);
  const [description, setDescription] = useState(drone.description);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onSave(drone.droneId, { title, description });
  };

  return (
    <div className="fixed inset-0 bg-black-tr bg-opacity-80 flex justify-center items-center z-50">
      <div className="glassmorphism p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 text-white"
              required
            />
          </div>
          <div className="flex justify-between mt-4">
          <button onClick={onClose} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
