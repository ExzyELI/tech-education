import React, { useState, useEffect } from "react";
import {
  User,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/init_app";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheckCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onCancel: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({
  isOpen,
  onCancel,
}) => {
  const [user, setUser] = useState<User | null>(null); // set user
  const [passwordError, setPasswordError] = useState(""); // set errors
  const [changeSuccessful, setChangeSuccessful] = useState(false); // success

  // password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  // toggle visibility
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleConfirmPassword = async () => {
    if (!user || !user.email) return;

    try {
      // authenticate user
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      // validate new password
      if (
        newPassword.length < 8 ||
        !/\d/.test(newPassword) ||
        !/[A-Z]/.test(newPassword)
      ) {
        setPasswordError(
          "Password must be at least 8 characters long and contain at least one number/uppercase letter",
        );
        setNewPassword("");
        setConfirmNewPassword("");
        return;
      }
      // confirm new password
      if (newPassword !== confirmNewPassword) {
        setPasswordError("Passwords do not match");
        setNewPassword("");
        setConfirmNewPassword("");
        return;
      }

      await updatePassword(user, newPassword);

      console.log("Password updated successfully.");
      setPasswordError("");
      setChangeSuccessful(true);
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      setPasswordError("Incorrect current password");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
          <div className="relative w-4/5 max-w-sm rounded-lg bg-white p-6">
            <button
              type="button"
              className="absolute right-0 top-0 mr-2 mt-2 pr-2 pt-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              onClick={onCancel}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {!changeSuccessful && (
              <h2 className="mb-4 text-lg font-semibold">Change Password</h2>
            )}
            {!changeSuccessful && passwordError && (
              <p className="mt-2 text-red-500">{passwordError}</p>
            )}
            {changeSuccessful && (
              <div className="flex flex-col items-center justify-center text-[#DDD6F3]">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="mx-auto mb-2 h-12 w-12"
                />
                <h3 className="text-lg font-bold text-gray-600">
                  Changes successful
                </h3>
              </div>
            )}
            {!changeSuccessful && (
              <>
                <div className="relative mb-2">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value.trim())}
                    placeholder="Enter current password"
                    className="w-full rounded-md border border-gray-300 p-2 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword((prev) => !prev)}
                    className="absolute inset-y-0 right-0 mr-3 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <FontAwesomeIcon
                      icon={showCurrentPassword ? faEyeSlash : faEye}
                    />
                  </button>
                </div>
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
                    onClick={handleConfirmPassword}
                  >
                    Change Password
                  </button>
                  <button
                    className="ms-3 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-red-700"
                    onClick={onCancel}
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
