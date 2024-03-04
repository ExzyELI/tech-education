import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

interface ConfirmationModalProps {
  message: string; // message to display in modal
  onConfirm: () => void; // function when confirm button is clicked
  onCancel: () => void; // function when cancel button or close icon is clicked
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  // state to track if confirmation was made
  const [confirmed, setConfirmed] = useState(false);
  // state to track any errors during confirmation
  const [error, setError] = useState("");

  // function to handle confirmation
  const handleConfirm = () => {
    try {
      onConfirm();
      setConfirmed(true);
      setError("");
    } catch (err) {
      setError("An error occurred while confirming.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75 font-sans">
      {/* dialog */}
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow-xl">
          <button
            type="button"
            className="absolute right-2 top-3 flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={onCancel}
          >
            <FontAwesomeIcon icon={faTimes} />
            <span className="sr-only">Close</span>
          </button>
          <div className="p-4 text-center md:p-5">
            {/* display success or error message */}
            {error ? (
              <div className="mb-4 flex flex-col items-center justify-center text-red-500">
                <FontAwesomeIcon
                  icon={faExclamationCircle}
                  className="mx-auto mb-2 h-12 w-12 text-gray-400"
                />
                <h3 className="mb-2 text-lg font-normal">{error}</h3>
              </div>
            ) : (
              <div className="mb-4 flex flex-col items-center justify-center text-gray-500">
                {confirmed ? (
                  <>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="mx-auto mb-2 h-12 w-12 text-[#DDD6F3]"
                    />
                    <h3 className="text-lg font-bold">Changes successful</h3>
                  </>
                ) : (
                  <div>
                    <FontAwesomeIcon
                      icon={faExclamationCircle}
                      className="mx-auto mb-2 h-12 w-12 text-gray-400"
                    />
                    <h3 className="text-lg font-normal">{message}</h3>
                  </div>
                )}
              </div>
            )}

            {/* don't show yes button if confirmed */}
            {!confirmed && (
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="ms-3 w-32 rounded-lg border border-gray-200 bg-[#ffe08d] px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-[#ffd564]"
                onClick={handleConfirm}
              >
                Yes
              </button>
            )}

            {/* don't show no button if confirmed */}
            {!confirmed && (
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="ms-3 w-32 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-red-700"
                onClick={onCancel}
              >
                No
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
