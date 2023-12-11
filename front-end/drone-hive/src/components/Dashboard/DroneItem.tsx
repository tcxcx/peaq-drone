import React from "react";

type Drone = {
  droneId: string;
  name: string;
  description: string;
  ownerWalletAddress: string;
  imagePath?: string;
  imageUrl: string;
};

interface DroneItemProps {
  drone: Drone;
  onEdit: () => void;
  onDelete: () => void;
  isOwner: boolean;
}

const DroneItem: React.FC<DroneItemProps> = ({
  drone,
  onEdit,
  onDelete,
  isOwner,
}) => {
  const baseUrl =
    "https://tdbuogudqjkikprfmrxr.supabase.co/storage/v1/object/public/drone-images";
  const imageUrl = drone.imagePath ? `${baseUrl}/${drone.imagePath}` : "";

  return (
    <div className="bg-transparent border border-white rounded-lg shadow-md p-4 flex flex-col">
      {drone.imagePath && (
        <img
          src={imageUrl}
          alt={drone.name}
          className="mb-4 w-full h-48 object-cover rounded"
        />
      )}
      <div className="flex-grow mb-4">
        <h3 className="text-xl font-ribbon font-semibold mb-2 text-white">
          {drone.name}
        </h3>
        <p className="text-gray-300">{drone.description}</p>
      </div>
      {isOwner && (
        <div className="flex space-x-2 mt-4 justify-end">
          <button
            onClick={onEdit}
            className="bg-transparent border font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-transparent border font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DroneItem;
