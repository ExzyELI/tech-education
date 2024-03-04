"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/init_app";
import { User, updatePassword } from "firebase/auth";
import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationModal from "./confirmation-modal";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [grade, setGrade] = useState("");
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [originalData, setOriginalData] = useState({
    // original data for resetting fields
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    birthdate: "",
    grade: "",
    password: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setRole(userData.role);
          setBirthdate(userData.birthdate);
          setGrade(userData.grade);

          // reset to original data
          const originalData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            birthdate: userData.birthdate || "",
            grade: userData.grade || "",
            password: "",
          };

          setOriginalData(originalData);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const saveChanges = async () => {
    try {
      if (!user) {
        // Handle case where user is null
        return;
      }

      // Open the confirmation modal
      setConfirmModalOpen(true);
    } catch (error) {
      // Update error state if there was an error
      setSuccess(false); // Set success to false
      setError("An error occurred while saving changes."); // Set error message
      // Close the confirmation modal in case of error
      setConfirmModalOpen(false);
    }
  };

  const confirmSave = async () => {
    setConfirmModalOpen(false);

    if (!user) return;

    // Assume the update operation is successful
    setSuccess(true);

    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);

      // Perform the update operation
      await updateDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        birthdate: birthdate,
        grade: grade,
      });

      // If the update operation is successful, set success to true
      setSuccess(true);
    } catch (error) {
      // If an error occurs during the update operation, set success to false and display the error message
      setSuccess(false);
      setError("An error occurred while saving changes.");
      console.error("Error updating document:", error);
    }

    // Toggle the edit mode
    setEditMode(false);

    // update with new values
    setOriginalData({
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      birthdate: birthdate,
      grade: grade,
      password: originalData.password,
    });

    // Open the confirmation modal
    setConfirmModalOpen(true);
  };

  const cancelEdit = () => {
    // cancel profile edits
    setEditMode(false);
    // reset fields to initial values
    setFirstName(originalData.firstName);
    setLastName(originalData.lastName);
    setEmail(originalData.email);
    setRole(originalData.role);
    setBirthdate(originalData.birthdate);
    setGrade(originalData.grade);
    setSuccess(false);
    setError("");
  };

  // function to handle password change
  const handleChangePassword = async () => {
    try {
      if (!user) return;

      if (newPassword !== confirmNewPassword) {
        setPasswordError("Passwords do not match. Please re-enter.");
        return;
      }

      await updatePassword(user, newPassword);
      // toggle the visibility
      setPasswordModalOpen(false);
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordError("");
    } catch (error: any) {
      console.error("Error changing password:", error.message);
      setPasswordError("Error changing password. Please try again.");
    }
  };

  const handleRoleChange = (newRole: string) => {
    // if the new role is Parent or Teacher, set grade to empty
    if (newRole === "Parent" || newRole === "Teacher") {
      setGrade("");
    }
    setRole(newRole);
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#ffecde] font-serif text-[#0D103E]">
      <title>Tech Education</title>
      <Nav />
      <div className="mb-5 mt-5 flex flex-1 items-center justify-center p-8">
        {user && (
          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-[#FFFFFF] shadow-md">
            <div className="flex flex-col items-center px-6 pb-5">
              <img
                className="mb-3 mt-5 h-24 w-24 rounded-full shadow-md"
                src="https://cdn-icons-png.flaticon.com/512/4322/4322993.png"
              />
              <h1
                className={`font-bold ${editMode ? "text-md" : "text-3xl"} text-[#2E2E2E]`}
              >
                {editMode && (
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <label
                        htmlFor="firstName"
                        className="text-md mb-1 font-semibold"
                      >
                        First Name:
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value.trim())}
                        className={`mb-2 w-full rounded-md border px-3 py-2 leading-tight text-gray-600 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 ${
                          editMode && firstName !== originalData.firstName
                            ? "bg-yellow-100"
                            : ""
                        }`}
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="lastName"
                        className="text-md mb-1 font-semibold"
                      >
                        Last Name:
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value.trim())}
                        className={`mb-2 w-full rounded-md border px-3 py-2 leading-tight text-gray-600 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 ${
                          editMode && lastName !== originalData.lastName
                            ? "bg-yellow-100"
                            : ""
                        }`}
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div className="mb-2">
                      <label
                        htmlFor="role"
                        className="text-md mb-1 font-semibold"
                      >
                        Role:
                      </label>
                      <select
                        id="role"
                        value={role}
                        onChange={(e) =>
                          handleRoleChange(e.target.value.trim())
                        }
                        className={`mb-2 w-full cursor-pointer rounded-md border px-3 py-2 leading-tight text-gray-600 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 ${
                          editMode && role !== originalData.role
                            ? "bg-yellow-100"
                            : ""
                        }`}
                      >
                        <option value="Student">Student</option>
                        <option value="Parent">Parent</option>
                        <option value="Teacher">Teacher</option>
                      </select>
                    </div>
                  </div>
                )}
                {!editMode && (
                  <div className="flex flex-col items-center">
                    <span>
                      {firstName}
                      <span className="ml-1">{lastName}</span>
                    </span>
                    <span className="mb-6 text-sm text-gray-400">{role}</span>
                  </div>
                )}
              </h1>

              <ul className="w-full">
                <li
                  className={`${editMode ? "-mb-4" : "mb-4"} -mt-3 flex items-center rounded-lg p-3 font-semibold ${editMode ? "flex-col" : "bg-[#F2EFFE]"}`}
                >
                  {editMode ? (
                    <div className="flex flex-col">
                      <label
                        htmlFor="email"
                        className="text-md font-semibold text-[#2E2E2E]"
                      >
                        Email:
                      </label>
                      <input
                        id="email"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value.trim())}
                        className={`mb-2 w-[320px] rounded-md border px-3 py-2 leading-tight text-gray-600 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 ${
                          editMode && email !== originalData.email
                            ? "bg-yellow-100"
                            : ""
                        }`}
                        placeholder="Email"
                      />
                    </div>
                  ) : (
                    <>
                      <h2
                        className={`text-md mr-4 w-[115px] rounded-lg bg-[#DDD6F3] px-4 py-2 text-center font-semibold ${editMode ? "bg-white" : "bg-[#DDD6F3]"}`}
                      >
                        Email:
                      </h2>
                      <span className="text-gray-700">{email}</span>
                    </>
                  )}
                </li>

                <li
                  className={`flex items-center rounded-lg p-3 font-semibold ${editMode ? "-mb-2" : "mb-4"} ${editMode ? "flex-col" : "bg-[#F2EFFE]"}`}
                >
                  {editMode ? (
                    <div className="flex flex-col">
                      <label
                        htmlFor="password"
                        className="text-md font-semibold text-[#2E2E2E]"
                      >
                        Password:
                      </label>
                      <button
                        className="w-[320px] rounded-md border p-2 text-left text-[#6C94FF]"
                        onClick={() => setPasswordModalOpen(true)}
                      >
                        Change Password
                      </button>
                    </div>
                  ) : (
                    <>
                      <h2
                        className={`text-md mr-4 w-[115px] rounded-lg bg-[#DDD6F3] px-4 py-2 text-center font-semibold ${editMode ? "bg-white" : "bg-[#DDD6F3]"}`}
                      >
                        Password:
                      </h2>
                      <span>******</span>
                    </>
                  )}
                </li>

                {passwordModalOpen && (
                  <div className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-500 bg-opacity-75">
                    <div className="w-4/5 max-w-sm rounded-lg bg-white p-6">
                      <h2 className="mb-4 text-lg font-semibold">
                        Change Password
                      </h2>
                      {passwordError && (
                        <p className="mt-2 text-red-500">{passwordError}</p>
                      )}
                      <div className="relative mb-2">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) =>
                            setNewPassword(e.target.value.trim())
                          }
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
                          onClick={() =>
                            setShowConfirmPassword((prev) => !prev)
                          }
                          className="absolute inset-y-0 right-0 mr-3 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          <FontAwesomeIcon
                            icon={showConfirmPassword ? faEyeSlash : faEye}
                          />
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <button
                          className="mr-2 rounded-md bg-[#6C94FF] px-4 py-2 text-white hover:bg-[#AEC8FF]"
                          onClick={handleChangePassword}
                        >
                          Change Password
                        </button>
                        <button
                          className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-200"
                          onClick={() => {
                            setNewPassword("");
                            setConfirmNewPassword("");
                            setPasswordError("");
                            setPasswordModalOpen(false);
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {role === "Student" && (
                  <li
                    className={`${editMode ? "-mb-2" : "mb-4"} flex items-center rounded-lg p-3 font-semibold ${editMode ? "flex-col" : "bg-[#F2EFFE]"}`}
                  >
                    {editMode ? (
                      <div className="flex flex-col">
                        <label
                          htmlFor="grade"
                          className="text-md font-semibold text-[#2E2E2E]"
                        >
                          Grade:
                        </label>
                        <select
                          id="grade"
                          value={grade}
                          onChange={(e) => setGrade(e.target.value.trim())}
                          className={`mb-2 w-[320px] cursor-pointer rounded-md border px-3 py-2 leading-tight text-gray-600 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 ${
                            editMode && grade !== originalData.grade
                              ? "bg-yellow-100"
                              : ""
                          }`}
                        >
                          <option value="">Select a grade</option>
                          <option value="Kindergarten">Kindergarten</option>
                          <option value="1st">1st</option>
                          <option value="2nd">2nd</option>
                        </select>
                      </div>
                    ) : (
                      <>
                        <h2
                          className={`text-md mr-4 w-[115px] rounded-lg bg-[#DDD6F3] px-4 py-2 text-center font-semibold ${editMode ? "bg-white" : "bg-[#DDD6F3]"}`}
                        >
                          Grade:
                        </h2>
                        <span>{grade ? grade : "N/A"}</span>
                      </>
                    )}
                  </li>
                )}

                <li
                  className={`mb-4 flex items-center rounded-lg p-3 font-semibold ${editMode ? "flex-col" : "bg-[#F2EFFE]"}`}
                >
                  {editMode ? (
                    <div className="flex flex-col">
                      <label
                        htmlFor="birthdate"
                        className="text-md font-semibold text-[#2E2E2E]"
                      >
                        Birthdate:
                      </label>
                      <input
                        id="birthdate"
                        type="date"
                        value={birthdate}
                        onChange={(e) => setBirthdate(e.target.value.trim())}
                        className={`mb-2 w-[320px] rounded-md border px-3 py-2 leading-tight text-gray-600 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 ${
                          editMode && birthdate !== originalData.birthdate
                            ? "bg-yellow-100"
                            : ""
                        }`}
                      />
                    </div>
                  ) : (
                    <>
                      <h2
                        className={`text-md mr-4 w-[115px] rounded-lg bg-[#DDD6F3] px-4 py-2 text-center font-semibold ${editMode ? "bg-white" : "bg-[#DDD6F3]"}`}
                      >
                        Birthdate:
                      </h2>
                      <span>{birthdate ? birthdate : "N/A"}</span>
                    </>
                  )}
                </li>
              </ul>

              {editMode && (
                <div className="flex space-x-4 pb-4">
                  <button
                    className="rounded-md bg-[#6C94FF] px-4 py-2 text-white hover:bg-[#AEC8FF]"
                    onClick={saveChanges}
                  >
                    Save Changes
                  </button>
                  <button
                    className="rounded-md bg-gray-300 px-4 py-2 text-gray-500 hover:bg-gray-200"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {!editMode && (
                <div
                  className="mt-2 cursor-pointer items-center rounded-lg bg-[#6C94FF] px-4 py-2 text-center text-sm font-bold text-white hover:bg-[#AEC8FF]"
                  onClick={() => setEditMode(true)}
                >
                  Edit
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
      {confirmModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to save changes?"
          onConfirm={confirmSave}
          onCancel={() => setConfirmModalOpen(false)}
        />
      )}
    </main>
  );
};

export default ProfilePage;
