"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase/init_app";
import { User } from "firebase/auth";
import { signOut } from "firebase/auth";
import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [firstName, setFirstName] = useState(""); // first name
  const [lastName, setLastName] = useState(""); // last name
  const [email, setEmail] = useState(""); // email
  const [role, setRole] = useState(""); // role
  const [birthdate, setBirthdate] = useState(""); // birthdate
  const [grade, setGrade] = useState(""); // grade

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
          setBirthdate(userData.birthdate);
          setGrade(userData.grade);
        }
      }
    });

    return () => unsubscribe();
  }, []);

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
              <h1 className="text-3xl font-bold text-[#2E2E2E]">
                {firstName} {lastName}
              </h1>
              <span className="mb-2 text-sm text-[#6B6B6B]">{role}</span>
              <ul className="w-full">
                <li className="mb-2 flex items-center rounded-lg bg-[#F2EFFE] p-3 font-semibold">
                  <h2 className="text-md mr-4 w-[115px] rounded-lg bg-[#DDD6F3] px-4 py-2 text-center font-semibold">
                    Email:
                  </h2>
                  <span>{email}</span>
                </li>
                <li className="mb-2 flex items-center rounded-lg bg-[#F2EFFE] p-3 font-semibold">
                  <h2 className="text-md mr-4 w-[115px] rounded-lg bg-[#DDD6F3] px-4 py-2 text-center font-semibold">
                    Password:
                  </h2>
                  <span>*********</span>
                </li>
                <li className="mb-2 flex items-center rounded-lg bg-[#F2EFFE] p-3 font-semibold">
                  <h2 className="text-md mr-4 w-[115px] rounded-lg bg-[#DDD6F3] px-4 py-2 text-center font-semibold">
                    Birthdate:
                  </h2>
                  <span>{birthdate}</span>
                </li>
                <li className="flex items-center rounded-lg bg-[#F2EFFE] p-3 font-semibold">
                  <h2 className="text-md mr-4 w-[115px] rounded-lg bg-[#DDD6F3] px-4 py-2 text-center font-semibold">
                    Grade:
                  </h2>
                  <span>{grade}</span>
                </li>
              </ul>
              <div className="mt-4 cursor-pointer items-center rounded-lg bg-[#6C94FF] px-4 py-2 text-center text-sm font-bold text-white hover:bg-[#AEC8FF] md:mt-6">
                Edit
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default ProfilePage;
