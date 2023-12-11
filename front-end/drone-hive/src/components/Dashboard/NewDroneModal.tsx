"use client";

import React, { ChangeEvent, useState, useEffect } from "react";
import axios from "axios";
import useWalletStore from "@/hooks/context/useWalletStore";
import { toast } from "sonner";
import { generateSpheres } from "./ProductCard";
import { createPeaqDID } from "@/hooks/CRUD/createPeaqDID";
import Spinner from '@/components/Landing/Spinner'

interface NewDroneModalProps {
  onClose: () => void;
  onSave: (newData: FormData) => void;
}

export const NewDroneModal: React.FC<NewDroneModalProps> = ({
  onClose,
  onSave,
}) => {
  const { walletAddress } = useWalletStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [machineId, setMachineId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const backgroundSpheres = generateSpheres(1000, ["5px", "3.5", "1.25px"]).map(
    (sphere, index) =>
      React.cloneElement(sphere, {
        style: {
          ...sphere.props.style,
          zIndex: -1,
          opacity: 0.5,
          animationDuration: `${60 + index * 10}s`,
        },
      })
  );

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file && file.type === "image/png") {
        setImage(file);
      } else {
        toast.error("Please select a PNG image.");
      }
    }
  };
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!walletAddress) {
      toast.error("Wallet address is not available");
      return;
    }

    if (!name) {
      toast.error("Name is required for MachineID creation");
      return;
    }

    try {
      const newMachineId = await createPeaqDID(name);

      if (newMachineId) {
        console.log(`Created peaq DID: ${newMachineId}`);
        setMachineId(newMachineId.toString());

        const formData = new FormData();
        formData.append("ownerWalletAddress", walletAddress);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("machineId", newMachineId.toString());
        if (image) {
          formData.append("image", image);
        }

        await axios.post("http://localhost:5000/drone-listing", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setName("");
        setDescription("");
        setImage(null);
        toast.success("Drone registered successfully!");
        onClose();
      } else {
        throw new Error("DID creation did not return a valid ID.");
      }
    } catch (error) {
      console.error("Error creating peaq DID:", error);
      toast.error("Failed to register drone");
    }
    setIsSubmitting(false);
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
      {backgroundSpheres}
      <div className="border glassmorphism border-basement-purple/30 p-10 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white text-base font-bold mb-2 font-ribbon uppercase">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="appearance-none border border-basement-purple/50 focus:border-basement-purple/90 hover:bg-basement-purple/10 focus:bg-basement-purple/10  rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white"
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
              className="appearance-none border border-basement-purple/50 focus:border-basement-purple/90 hover:bg-basement-purple/10 focus:bg-basement-purple/10  rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline bg-transparent text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-white text-base font-bold mb-2 font-ribbon uppercase">
              File Upload
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32  border-2 border-basement-purple/50 border-dashed hover:bg-basement-purple/10 hover:border-basement-purple/70 transition-colors duration-300 ease-in-out">
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
          {isSubmitting ? (
            <Spinner />
          ) : (
            <div className="flex justify-end gap-4 pt-4">
              <button
                onClick={onClose}
                className="bg-transparent border font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-transparent border font-ribbon uppercase hover:animate-pulse border-basement-purple hover:bg-basement-purple/20 text-white font-bold py-2 px-4 rounded"
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          )}
          </div>
        </form>
      </div>
    </div>
  );
};
