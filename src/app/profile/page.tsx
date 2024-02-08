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
    <main className="font-family: bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      <Nav />
      <section className="pb-[280px]">
        <h1 className="flex flex-col items-center justify-center pt-8 text-5xl font-bold tracking-tight">
          User Profile
        </h1>
        <div className="mx-auto mt-5 flex items-center justify-center p-8 lg:w-2/3">
          {user && (
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {firstName} {lastName}
                    </dd>
                  </div>
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Email</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {email}
                    </dd>
                  </div>
                  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {role}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ProfilePage;
