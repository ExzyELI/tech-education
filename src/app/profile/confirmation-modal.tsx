import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
      {/* dialog */}
      <div className="relative max-h-full w-full max-w-md p-4">
        <div className="relative rounded-lg bg-white shadow">
          <button
            type="button"
            className="absolute end-2.5 top-3 ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
            onClick={onCancel}
          >
            <FontAwesomeIcon icon={faTimes} />
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 text-center md:p-5">
            <FontAwesomeIcon
              icon={faExclamationCircle}
              className="mx-auto mb-4 h-12 w-12 text-gray-400"
            />
            {/* display error message */}
            {error ? (
              <h3 className="mb-5 text-lg font-normal text-red-500">{error}</h3>
            ) : (
              <h3 className="mb-5 text-lg font-normal text-gray-500">
                {confirmed ? "Changes successful" : message}
              </h3>
            )}
            {!confirmed && (
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="inline-flex items-center rounded-lg bg-green-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800"
                onClick={handleConfirm}
              >
                Yes, I'm sure
              </button>
            )}
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-red-700"
              onClick={onCancel}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
