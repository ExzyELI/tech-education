"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [firstName, setFirstName] = useState(""); // first name
  const [lastName, setLastName] = useState(""); // last name
  const [email, setEmail] = useState(""); // email
  const [role, setRole] = useState(""); // role

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // updating user state when auth state changes
      setUser(user);

      if (user) {
        const firestore = getFirestore();

        // reference to user document in Firestore
        const userDocRef = doc(firestore, "users", user.uid);

        // snapshot of user document
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          // user data is grabbed from snapshot if user document exists
          const userData = userDocSnap.data();

          // setting the state with user's first name, last name, and email
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setRole(userData.role);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="mx-auto min-h-screen bg-gradient-to-br from-blue-100 to-purple-50 p-4 shadow-lg">
      <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
        {/* Display user's profile information */}
        {user && (
          <div>
            <h1 className="mb-4 text-3xl font-semibold">Profile</h1>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                First Name:
              </label>
              <p className="text-lg text-gray-900">{firstName}</p>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Last Name:
              </label>
              <p className="text-lg text-gray-900">{lastName}</p>
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Email:
              </label>
              <p className="text-lg text-gray-900">{email}</p>
            </div>

            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Role:
              </label>
              <p className="text-lg text-gray-900">{role}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
