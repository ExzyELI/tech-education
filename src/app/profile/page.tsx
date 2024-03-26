"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";
import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";
import ConfirmationModal from "./confirmation-modal";
import ChangePasswordModal from "./change-password-modal";
import ProfilePhotoModal from "./profile-photo-modal";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [grade, setGrade] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [roleCheck, setRoleCheck] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [gradeError, setGradeError] = useState("");

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

  const [originalData, setOriginalData] = useState({
    // original data for resetting fields
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    birthdate: "",
    grade: "",
    password: "",
    profilePhoto: "",
  });

  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [profilePhotoModalOpen, setProfilePhotoModalOpen] = useState(false);

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
          setProfilePhoto(
            userData.profilePhoto || "https://i.imgur.com/Y4WCdEs.jpg",
          );
          setStudentCode(userData.studentCode);

          // reset to original data
          const originalData = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            role: userData.role,
            birthdate: userData.birthdate || "",
            grade: userData.grade || "",
            password: "",
            profilePhoto: userData.profilePhoto,
          };

          const roleChecker = () => {
            // if statement checking if the user role is currently a student
            if (userData.role == "Student") {
              setRoleCheck(true);
            }
          };

          roleChecker();
          setOriginalData(originalData);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // function to save changes
  const saveChanges = async () => {
    try {
      if (!user) {
        // handles null user
        return;
      }

      // validate birthdate
      const isBirthdateValid = validateBirthdate();
      const isGradeValid = validateGrade();

      if (!isBirthdateValid || !isGradeValid) {
        // prevent form submission if validation fails
        return;
      }

      // email validation
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setEmailError("Invalid email format (abc@xyz.com)");
        return; // if error, do not save
      } else {
        setEmailError(""); // clear email error
      }

      // validate birthdate
      if (!validateBirthdate()) {
        return;
      }

      // validate grade for students
      if (role === "Student" && !grade) {
        setGradeError("Please select a grade level");
        return; // if error, do not save
      } else {
        setGradeError(""); // clear grade error
      }

      // check if any field has been modified
      if (
        firstName === originalData.firstName &&
        lastName === originalData.lastName &&
        email === originalData.email &&
        role === originalData.role &&
        birthdate === originalData.birthdate &&
        grade === originalData.grade &&
        profilePhoto === originalData.profilePhoto
      ) {
        // no changes made, return
        return;
      }

      setConfirmModalOpen(true);
    } catch (error) {
      // updates if there was an error
      setError("An error occurred while saving changes."); // set error message
      setConfirmModalOpen(false);
    }
  };

  const validateGrade = () => {
    if (role === "Student" && !grade) {
      setGradeError("Please select a grade level");
      return false;
    }

    // clear grade error
    setGradeError("");
    return true; // grade is valid
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    // clear the email error on typing
    setEmailError("");
  };

  // checks for a valid name
  const isValidName = (name: string) => {
    // match name to letters, hyphen, and apostrophe
    const regex = /^[a-zA-Z'-]+$/;
    return regex.test(name);
  };

  // error handling for first name
  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (isValidName(value)) {
      setFirstName(value);
    }
  };

  // error handling for last name
  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (isValidName(value)) {
      setLastName(value);
    }
  };

  // function to confirm changes
  const confirmSave = async () => {
    setConfirmModalOpen(true);
    if (!user) return;

    try {
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", user.uid);

      // updates the document
      await updateDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
        birthdate: birthdate,
        grade: grade,
        profilePhoto: profilePhoto,
      });

      // opens confirmation modal
      setConfirmModalOpen(true);
    } catch (error) {
      // if errors, set to false and display error message
      setError("An error occurred while saving changes.");
      console.error("Error updating document:", error);
    }

    // toggle edit mode
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
      profilePhoto: originalData.profilePhoto,
    });

    // opens confirmation modal
    setConfirmModalOpen(true);
  };

  // function to cancel edits
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
    setProfilePhoto(originalData.profilePhoto);

    // clear error messages
    setError("");
    setEmailError("");
    setBirthdateError("");
    setGradeError("");
  };

  const handleRoleChange = (newRole: string) => {
    // if the new role is Parent or Teacher, set grade to empty
    if (newRole === "Parent" || newRole === "Teacher") {
      setGrade("");
    }
    setRole(newRole);
    setBirthdateError("");
  };

  // function to handle birthdate change
  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setBirthdate(value);
    setBirthdateError("");
  };

  // function to validate birthdate based on user role
  const validateBirthdate = (inputBirthdate = birthdate) => {
    // birthdate must be filled (YYYY-MM-DD format)
    if (!inputBirthdate || !/^\d{4}-\d{2}-\d{2}$/.test(inputBirthdate)) {
      setBirthdateError("Please fill in the birth month, day, and year");
      return false;
    }
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const birthDate = new Date(birthdate);
    const birthYear = birthDate.getFullYear();
    let age = currentYear - birthYear;

    // check if birthday has passed in the current year
    // if not, subtract one year from age
    const hasBirthdayPassedThisYear =
      currentDate >=
      new Date(currentYear, birthDate.getMonth(), birthDate.getDate());
    if (!hasBirthdayPassedThisYear) {
      age--;
    }

    // maximum plausible age (e.g., 120 years)
    const maxPlausibleAge = 120;
    const earliestPlausibleYear = currentYear - maxPlausibleAge;

    // check for a plausible birth year
    if (birthYear < earliestPlausibleYear) {
      setBirthdateError("Please enter a valid birth year");
      return false;
    }

    // defining age requirements based on typical U.S. standards
    const kindergartenStartAge = 5;
    const firstGradeStartAge = 6;
    const secondGradeStartAge = 7;

    // assume cutoff date of 9/1 for school enrollment
    const cutoffMonth = 8; // september (0-indexed)
    const isBeforeCutoff =
      currentDate.getMonth() < cutoffMonth ||
      (currentDate.getMonth() === cutoffMonth && currentDate.getDate() < 1);

    if (role === "Student") {
      let requiredAge = 0;
      if (grade === "Kindergarten") requiredAge = kindergartenStartAge;
      else if (grade === "1st") requiredAge = firstGradeStartAge;
      else if (grade === "2nd") requiredAge = secondGradeStartAge;

      if (isBeforeCutoff) requiredAge--;

      if (age !== requiredAge) {
        setBirthdateError(`Age must match grade level`);
        return false;
      }
    } else {
      // parents and teachers
      if (age < 18) {
        setBirthdateError("Must be 18 years or older");
        return false;
      }
    }

    return true; // birthdate is valid
  };

  return (
    <main className="flex min-h-screen flex-col bg-[#FAF9F6] font-sans text-[#0D103E]">
      <title>Tech Education</title>
      <Nav />
      {/* display error message if it exists */}
      {error && (
        <div className="mx-auto max-w-4xl px-4 py-2 text-center text-red-500">
          {error}
        </div>
      )}
      <div className="mb-5 mt-5 flex min-h-screen flex-1 items-center justify-center p-8">
        {user && (
          <div className="w-full max-w-md rounded-lg border border-gray-200 bg-[#FFFFFF] py-4 shadow-md">
            <div className="flex flex-col items-center px-6 pb-5">
              {profilePhoto && (
                <img
                  className="mb-3 mt-5 h-24 w-24 rounded-full shadow-md"
                  src={profilePhoto}
                />
              )}

              <h1
                className={`font-bold ${editMode ? "text-md" : "text-3xl"} text-[#2E2E2E]`}
              >
                {editMode && (
                  <div className="flex flex-col">
                    <button
                      className="text-md -mt-2 mb-2 font-semibold text-[#a891ed]"
                      onClick={() => setProfilePhotoModalOpen(true)}
                    >
                      Change Photo
                    </button>
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
                        onChange={handleFirstNameChange}
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
                        onChange={handleLastNameChange}
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
                {!editMode && roleCheck && (
                  <div className="flex flex-col items-center">
                    <span>
                      {firstName}
                      <span className="ml-1">{lastName}</span>
                    </span>
                    <span className="mb-6 text-sm text-gray-400">
                      {role}: {studentCode}
                    </span>
                  </div>
                )}
                {!editMode && !roleCheck && (
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
                        onChange={handleEmailChange}
                        className={`mb-2 w-[320px] rounded-md border px-3 py-2 leading-tight 
                        ${emailError ? "border-red-500" : ""} focus:border-[#ffcf4f]
                        focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 
                        ${
                          editMode && email !== originalData.email
                            ? "bg-yellow-100"
                            : ""
                        }`}
                        placeholder="Email"
                      />
                      {emailError && (
                        <div className="text-red-500">{emailError}</div>
                      )}
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
                        className="w-[320px] rounded-md border p-2 text-left text-[#a891ed]"
                        onClick={() => setChangePasswordModalOpen(true)}
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
                          onChange={(e) => {
                            setGrade(e.target.value.trim());
                            setGradeError(""); // Reset error message on user interaction
                          }}
                          className={`mb-2 w-[320px] cursor-pointer rounded-md border px-3 py-2 leading-tight text-gray-600 focus:border-[#ffcf4f] focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 ${
                            gradeError ? "border-red-500" : ""
                          }`}
                        >
                          <option value="">Select a grade</option>
                          <option value="Kindergarten">Kindergarten</option>
                          <option value="1st">1st</option>
                          <option value="2nd">2nd</option>
                        </select>
                        {gradeError && (
                          <div className="text-red-500">{gradeError}</div>
                        )}
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
                        onChange={handleBirthdateChange}
                        max={new Date().toISOString().split("T")[0]} // Set max date to today
                        className={`mb-2 w-[320px] rounded-md border px-3 py-2 leading-tight 
                        ${birthdateError ? "border-red-500" : ""} focus:border-[#ffcf4f]
                        focus:outline-none focus:ring focus:ring-[#ffe08d] focus:ring-opacity-50 
                        ${
                          editMode && birthdate !== originalData.birthdate
                            ? "bg-yellow-100"
                            : ""
                        }`}
                      />

                      {birthdateError && (
                        <div className="text-red-500">{birthdateError}</div>
                      )}
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
                <div className="-ml-2 flex space-x-4 pb-4">
                  <button
                    className={`ms-3 w-32 rounded-lg border border-gray-200 px-5 py-2.5 text-sm font-bold ${
                      !(
                        firstName !== originalData.firstName ||
                        lastName !== originalData.lastName ||
                        email !== originalData.email ||
                        role !== originalData.role ||
                        birthdate !== originalData.birthdate ||
                        grade !== originalData.grade ||
                        profilePhoto !== originalData.profilePhoto
                      )
                        ? "cursor-not-allowed bg-gray-400 text-gray-600"
                        : "bg-[#ffe08d] text-gray-900 hover:bg-[#ffd564]"
                    }`}
                    onClick={saveChanges}
                  >
                    Save
                  </button>

                  <button
                    className="ms-3 w-32 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-gray-900 hover:bg-gray-100 hover:text-red-700"
                    onClick={cancelEdit}
                  >
                    Cancel
                  </button>
                </div>
              )}
              {!editMode && (
                <div
                  className="ms-3 mt-3 w-32 cursor-pointer items-center rounded-lg border border-gray-200 bg-[#ffe08d] px-5 py-2.5 text-center text-sm font-bold text-gray-900 hover:bg-[#ffd564]"
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

      {/* profile photo modal */}
      {profilePhotoModalOpen && (
        <ProfilePhotoModal
          isOpen={profilePhotoModalOpen}
          onClose={() => setProfilePhotoModalOpen(false)}
          setProfilePhoto={setProfilePhoto}
          isEditMode={true}
          currentPhoto={profilePhoto}
        />
      )}

      {/* confirmation modal */}
      {confirmModalOpen && (
        <ConfirmationModal
          message="Are you sure you want to save changes?"
          onConfirm={confirmSave}
          onCancel={() => setConfirmModalOpen(false)}
        />
      )}

      {/* change password modal */}
      {changePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={changePasswordModalOpen}
          onCancel={() => setChangePasswordModalOpen(false)}
        />
      )}
    </main>
  );
};

export default ProfilePage;
