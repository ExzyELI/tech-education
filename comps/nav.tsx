"use client";
import { auth } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

import { useState, useEffect } from "react";
import { sendEmailVerification } from "firebase/auth";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";


export default function Nav() {
  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [role, setrole] = useState(""); // user role

  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  
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
          setrole(userData.role);
        }
      }
    });

    return () => unsubscribe();
    }, []);
  
if (role == "Student")
  return (
    <nav className="sticky top-0 w-full border-b border-gray-200 bg-[#afce8b]">
      <header className="font-serif leading-normal tracking-normal">
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">
          <a href="/HomePage" className="cursor-pointer text-2xl font-semibold">
            Tech Education
          </a>
          {/* tabs */}
          <div className="flex items-center justify-center space-x-4 md:space-x-0 rtl:space-x-reverse">
            <nav className="text-md lg:text-lg mr-10">
              <a
                href="/activities"
                className="cursor-pointer px-4 font-semibold hover:text-[#ffe08d]"
              >
                Activities
              </a>
              <a
                href="/grades"
                className="cursor-pointer px-4 font-semibold hover:text-[#ffe08d]"
              >
                Grades
              </a>
              <a
                href="/profile"
                className="cursor-pointer px-4 font-semibold hover:text-[#ffe08d]"
              >
                Profile
              </a>
            </nav>
          </div>
          <button
            type="button"
            className="rounded-lg bg-[#ffe08d] px-6 py-2 text-center text-sm font-medium hover:bg-[#ffd564]"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </header>
    </nav>
  );
else if (role == "Teacher")
  return (
    <nav className="sticky top-0 w-full border-b border-gray-200 bg-[#afce8b]">
      <header className="font-serif leading-normal tracking-normal">
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">
          <a href="/HomePage" className="cursor-pointer text-2xl font-semibold">
            Tech Education
          </a>
          {/* tabs */}
          <div className="flex items-center justify-center space-x-3 md:space-x-0 rtl:space-x-reverse">
            <nav className="text-md lg:text-lg">
              <a
                href="/activities"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Activities
              </a>
              <a
                href="/grades"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Grades
              </a>
              <a
                href="#"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Reports
              </a>
              <a
                href="/Classroom"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Classroom
              </a>
              <a
                href="/profile"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Profile
              </a>
            </nav>
          </div>
          <button
            type="button"
            className="rounded-lg bg-[#ffe08d] px-6 py-2 text-center text-sm font-medium hover:bg-[#ffd564]"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </header>
    </nav>
  );
else if (role == "Parent")
  return (
    <nav className="sticky top-0 w-full border-b border-gray-200 bg-[#afce8b]">
      <header className="font-serif leading-normal tracking-normal">
        <div className="mx-auto flex flex-wrap items-center justify-between p-4">
          <a href="/HomePage" className="cursor-pointer text-2xl font-semibold">
            Tech Education
          </a>
          {/* tabs */}
          <div className="flex items-center justify-center space-x-3 md:space-x-0 rtl:space-x-reverse">
            <nav className="text-md lg:text-lg">
              <a
                href="/activities"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Activities
              </a>
              <a
                href="/grades"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Grades
              </a>
              <a
                href="#"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Reports
              </a>
              <a
                href="/Classroom"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Classroom
              </a>
              <a
                href="/profile"
                className="cursor-pointer px-3 font-semibold hover:text-[#ffe08d]"
              >
                Profile
              </a>
            </nav>
          </div>
          <button
            type="button"
            className="rounded-lg bg-[#ffe08d] px-6 py-2 text-center text-sm font-medium hover:bg-[#ffd564]"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </header>
    </nav>
  );
}
