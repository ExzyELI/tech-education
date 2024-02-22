"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/init_app";
import {
  User,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";

import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";

const ProfilePage = () => {
  // state variables
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [firstName, setFirstName] = useState(""); // first name
  const [lastName, setLastName] = useState(""); // last name
  const [email, setEmail] = useState(""); // email
  const [role, setRole] = useState(""); // role
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [currentPasswordError, setCurrentPasswordError] = useState("");
  const [birthdate, setBirthdate] = useState(""); // birthdate
  const [grade, setGrade] = useState(""); // grade
  const [editMode, setEditMode] = useState(false); // edit mode flag
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
    // checking authentication state
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setUser(user);

      if (user) {
        // if user is logged in, fetch data from Firestore
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          // setting user data to state variables
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setRole(userData.role);
          setBirthdate(userData.birthdate || "");
          setGrade(userData.grade || "");
          // reset data to original data
          setOriginalData({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            birthdate: userData.birthdate || "",
            grade: userData.grade || "",
            password: "",
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async () => {
    // handle profile update
    if (!user) return; // return if user is not logged in

    const firestore = getFirestore();
    const userDocRef = doc(firestore, "users", user.uid); // reference user document

    // update with new data
    await updateDoc(userDocRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
      role: role,
      birthdate: birthdate,
      grade: grade,
    });

    console.log("Profile updated successfully.");
    setEditMode(false); // return to view mode after saving edits
  };

  const handleUpdatePassword = async () => {
    if (!user) return;

    try {
      // checking current password
      const credential = EmailAuthProvider.credential(
        user.email ?? "",
        currentPassword,
      );
      await reauthenticateWithCredential(user, credential);

      // update password
      await updatePassword(user, newPassword);

      console.log("Password updated successfully.");
      setPasswordError("");
      setConfirmPasswordError("");
      setCurrentPasswordError("");
      setEditMode(false); // clears the fields and returns to view mode
    } catch (error: any) {
      console.error("Error updating password:", error.message);
      setPasswordError("");
      setConfirmPasswordError("");
      setCurrentPasswordError("");
      if (error.code === "auth/wrong-password") {
        setCurrentPasswordError("Incorrect current password");
      }
    }
  };

  const handleConfirmPassword = () => {
    if (currentPassword === "") {
      setCurrentPasswordError("Please enter your current password");
      return;
    }

    if (
      newPassword.length < 8 ||
      !/\d/.test(newPassword) ||
      !/[A-Z]/.test(newPassword)
    ) {
      setPasswordError(
        "Password must be at least 8 characters long and contain at least one number and one uppercase letter",
      );
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");
    setConfirmPasswordError("");
    setCurrentPasswordError("");
    handleUpdatePassword();
  };

  const cancelEdit = () => {
    // function to cancel profile edits
    setEditMode(false);
    // resets fields to their original values if editing is canceled
    setFirstName(originalData.firstName);
    setLastName(originalData.lastName);
    setEmail(originalData.email);
    setRole(originalData.role);
    setBirthdate(originalData.birthdate);
    setGrade(originalData.grade);
    setNewPassword(originalData.password);
  };

  return (
    <main className="font-family bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      <Nav />
      <section className="mx-auto max-w-[630px] pb-[280px]">
        <div className="mt-5 flex w-full items-center justify-center p-8">
          {user && ( // checks if user is logged in
            <div className="w-full overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  {/* name section */}
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>{" "}
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {!editMode ? ( // check edit mode
                        <span>
                          {firstName} {lastName}{" "}
                          {/* display first and last name */}
                        </span>
                      ) : (
                        <>
                          {" "}
                          {/* fields for first and last name */}
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="rounded-md border border-gray-300 px-2 py-1"
                          />
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="ml-2 rounded-md border border-gray-300 px-2 py-1"
                          />
                        </>
                      )}
                    </dd>
                  </div>

                  {/* email section */}
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>{" "}
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {!editMode ? ( // check edit mode
                        <span>{email}</span> /* display email */
                      ) : (
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-[200px] rounded-md border border-gray-300 px-2 py-1"
                        />
                      )}
                    </dd>
                  </div>

                  {/* role section */}
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>{" "}
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {!editMode ? ( // check edit mode
                        <span>{role}</span> /* display role */
                      ) : (
                        <select
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="rounded-md border border-gray-300 px-2 py-1"
                        >
                          {/* dropdown */}
                          <option value="Student">Student</option>
                          <option value="Parent">Parent</option>
                          <option value="Teacher">Teacher</option>
                        </select>
                      )}
                    </dd>
                  </div>

                  {/* password section */}
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Password
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {!editMode ? (
                        <button
                          onClick={() => setEditMode(true)}
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          Edit
                        </button>
                      ) : (
                        <>
                          <div className="mt-2">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              value={currentPassword}
                              onChange={(e) =>
                                setCurrentPassword(e.target.value)
                              }
                              className="mr-2 rounded-md border border-gray-300 px-2 py-1"
                              placeholder="Current Password"
                            />
                            <input
                              type="checkbox"
                              checked={showCurrentPassword}
                              onChange={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="mr-2"
                            />
                            Show
                          </div>
                          {currentPasswordError && (
                            <p className="text-red-500">
                              {currentPasswordError}
                            </p>
                          )}
                          <div className="mt-2">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="mr-2 rounded-md border border-gray-300 px-2 py-1"
                              placeholder="New Password"
                            />
                            <input
                              type="checkbox"
                              checked={showNewPassword}
                              onChange={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="mr-2"
                            />
                            Show
                          </div>
                          {passwordError && (
                            <p className="text-red-500">{passwordError}</p>
                          )}
                          <div className="mt-2">
                            <input
                              type={
                                showConfirmNewPassword ? "text" : "password"
                              }
                              value={confirmNewPassword}
                              onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                              }
                              className="mr-2 rounded-md border border-gray-300 px-2 py-1"
                              placeholder="Confirm New Password"
                            />
                            <input
                              type="checkbox"
                              checked={showConfirmNewPassword}
                              onChange={() =>
                                setShowConfirmNewPassword(
                                  !showConfirmNewPassword,
                                )
                              }
                              className="mr-2"
                            />
                            Show
                          </div>
                          {confirmPasswordError && (
                            <p className="text-red-500">
                              {confirmPasswordError}
                            </p>
                          )}
                          <button
                            onClick={handleConfirmPassword}
                            className="mr-2 mt-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                          >
                            Save Password
                          </button>
                        </>
                      )}
                    </dd>
                  </div>

                  {/* birthdate section */}
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">
                      Birthdate
                    </dt>{" "}
                    {/* birthdate label */}
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {!editMode ? ( // check edit mode
                        <span>{birthdate}</span> /* display birthdate */
                      ) : (
                        <input
                          type="date"
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          className="rounded-md border border-gray-300 px-2 py-1"
                        />
                      )}
                    </dd>
                  </div>

                  {/* grade section */}
                  {role === "Student" && ( // only appears if role is "Student"
                    <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                      <dt className="text-sm font-medium text-gray-500">
                        Grade
                      </dt>{" "}
                      <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {!editMode ? ( // check edit mode
                          <span>{grade}</span> /* display grade */
                        ) : (
                          <select
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="rounded-md border border-gray-300 px-2 py-1"
                          >
                            {/* dropdown */}
                            <option value="Kindergarten">Kindergarten</option>
                            <option value="1st">1st</option>
                            <option value="2nd">2nd</option>
                          </select>
                        )}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
          )}
        </div>
        {/* buttons */}
        <div className="mt-4 flex justify-center">
          {!editMode && ( // button only appears in view mode
            <button
              onClick={() => setEditMode(true)}
              className="mr-2 rounded-md bg-[#ff6865] px-4 py-2 text-white hover:bg-[#ff8482]"
            >
              Edit Profile
            </button>
          )}
          {editMode && ( // buttons only appear in edit mode
            <>
              {/* save button */}
              <button
                className="mr-2 rounded-md bg-[#ff6865] px-4 py-2 text-white hover:bg-[#ff8482]"
                onClick={handleUpdateProfile}
              >
                Save
              </button>
              {/* cancel button */}
              <button
                className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProfilePage;
