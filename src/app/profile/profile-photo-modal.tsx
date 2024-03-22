import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface ProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  setProfilePhoto: (photo: string) => void;
  isEditMode: boolean;
  currentPhoto: string;
}

const ProfilePhotoModal: React.FC<ProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  setProfilePhoto,
  isEditMode,
  currentPhoto,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(
    currentPhoto || "https://i.imgur.com/Y4WCdEs.jpg",
  );
  const [isPhotoChanged, setIsPhotoChanged] = useState<boolean>(false);

  useEffect(() => {
    setIsPhotoChanged(selectedPhoto !== currentPhoto);
  }, [selectedPhoto, currentPhoto]);

  const handlePhotoSelect = (photo: string) => {
    setSelectedPhoto(photo);
  };

  const handleSave = () => {
    if (selectedPhoto && isEditMode) {
      setProfilePhoto(selectedPhoto);
    }
    onClose();
  };

  const presetPhotos: string[] = [
    "https://i.imgur.com/Y4WCdEs.jpg",
    "https://i.imgur.com/aaOq2YY.jpg",
    "https://i.imgur.com/9oj3LFH.jpg",
    "https://i.imgur.com/kvlbtlx.jpg",
    "https://i.imgur.com/xYQbMKV.jpg",
    "https://i.imgur.com/YoLybf6.jpg",
  ];

  return isOpen && isEditMode ? (
    <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
      <div className="relative w-4/5 max-w-sm rounded-lg bg-white p-6">
        <button
          type="button"
          className="absolute right-0 top-0 mr-2 mt-2 pr-2 pt-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h2 className="mb-4 text-lg font-semibold">Change Profile Photo</h2>

        <div className="grid grid-cols-3 gap-4">
          {presetPhotos.map((photo, index) => (
            <img
              key={index}
              src={photo}
              alt={`Photo ${index + 1}`}
              className={`cursor-pointer rounded-lg ${
                selectedPhoto === photo ? "border-4 border-[#a891ed]" : ""
              }`}
              onClick={() => handlePhotoSelect(photo)}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className={`mr-2 rounded-lg border border-gray-200 bg-[#ffe08d] px-5 py-2.5 text-sm font-bold text-gray-900 ${
              !isPhotoChanged
                ? "cursor-not-allowed bg-gray-400 text-gray-600"
                : "hover:bg-[#ffd564] hover:text-gray-900"
            }`}
            onClick={handleSave}
            disabled={!isPhotoChanged}
          >
            Save
          </button>
          <button
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-red-700"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default ProfilePhotoModal;
