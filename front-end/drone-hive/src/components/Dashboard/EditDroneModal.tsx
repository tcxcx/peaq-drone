import React, { useState, useEffect } from "react";

interface Drone {
  droneId: string;
  title: string;
  description: string;
  imageUrl: string;
}

interface EditDroneModalProps {
  drone: Drone;
  onClose: () => void;
  onSave: (droneId: string, updatedData: FormData) => void;
}

export const EditDroneModal: React.FC<EditDroneModalProps> = ({
  drone,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState(drone.title);
  const [description, setDescription] = useState(drone.description);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    onSave(drone.droneId, formData);
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(image);
    } else {
      setImagePreview(null);
    }
  }, [image]);

  return (
    <div className="fixed inset-0 bg-black-tr bg-opacity-80 flex justify-center items-center z-50">
      <div className="glassmorphism p-6 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
          <label className="block text-white text-base font-bold mb-2 font-ribbon uppercase">
              Title:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none border border-basement-purple/50 focus:border-basement-purple/90 hover:bg-basement-purple/10 focus:bg-basement-purple/10  glassmorphism rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white"
              required
            />
          </div>
          <div className="mb-4">
          <label className="block text-white text-base font-bold mb-2 font-ribbon uppercase">
              Description:
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="appearance-none border border-basement-purple/50 focus:border-basement-purple/90 hover:bg-basement-purple/10 focus:bg-basement-purple/10  glassmorphism rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-base font-bold mb-2 font-ribbon uppercase">
              File Upload
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 glassmorphism border-2 border-basement-purple/50 border-dashed hover:bg-basement-purple/10 hover:border-basement-purple/70 transition-colors duration-300 ease-in-out">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="File Preview"
                    className="w-full h-full object-contain p-2 bg-gray-900/20"
                  />
                ) : (
                  <>
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                        Attach a file
                      </p>
                    </div>
                  </>
                )}
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="opacity-0"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              onClick={onClose}
              className="bg-transparent border font-ribbon uppercase border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-transparent border font-ribbon uppercase border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
