import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { updatePassword } from "firebase/auth";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: any; // Adjust the type based on your user object type
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onClose,
  user,
}) => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [changeSuccessful, setChangeSuccessful] = useState(false);

  // function to handle password change
  const handleChangePassword = async () => {
    try {
      if (!user) return;

      // password criteria
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

      if (!newPassword.match(passwordRegex)) {
        setPasswordError(
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.",
        );
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setPasswordError("Passwords do not match. Please re-enter.");
        return;
      }

      await updatePassword(user, newPassword);
      // toggle the visibility
      onClose();
      setChangeSuccessful(true);
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordError("");
    } catch (error: any) {
      console.error("Error changing password:", error.message);
      setPasswordError("Error changing password. Please try again.");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className="w-4/5 max-w-sm rounded-lg bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold">Change Password</h2>
            {passwordError && (
              <p className="mt-2 text-red-500">{passwordError}</p>
            )}
            {changeSuccessful ? (
              <div className="mb-4 flex flex-col items-center justify-center text-[#DDD6F3]">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="mx-auto mb-2 h-12 w-12"
                />
                <h3 className="text-lg font-bold">Changes successful</h3>
              </div>
            ) : (
              <>
                <div className="relative mb-2">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value.trim())}
                    placeholder="Enter new password"
                    className="w-full rounded-md border border-gray-300 p-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 mr-3 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={showNewPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
                <div className="relative mb-4">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmNewPassword}
                    onChange={(e) =>
                      setConfirmNewPassword(e.target.value.trim())
                    }
                    placeholder="Confirm new password"
                    className="w-full rounded-md border border-gray-300 p-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 mr-3 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={showConfirmPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    className="ms-3 rounded-lg border border-gray-200 bg-[#ffe08d] px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-[#ffd564]"
                    onClick={handleChangePassword}
                  >
                    Change Password
                  </button>
                  <button
                    className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-red-700"
                    onClick={() => {
                      setNewPassword("");
                      setConfirmNewPassword("");
                      setPasswordError("");
                      onClose();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePasswordModal;
