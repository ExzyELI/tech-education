"use client";
import { auth, useHandleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export default function ActivitiesPage() {
  const router = useRouter();
  useHandleRedirect();

  const [user, setUser] = useState<User | null>(null); // logged-in user
  const [firstName, setFirstName] = useState(""); // first name
  const [lastName, setLastName] = useState(""); // last name

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
        }
      }
    });

    return () => unsubscribe();
    }, []);

  return (
    <main className="font-family: flex min-h-screen flex-col bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
      {/*navbar begins */}
      <Nav />
      {/* navbar ends */}

      <section className="pb-[320px] container mx-auto w-full">
        <h1 className="flex flex-col items-center justify-center pt-4 text-5xl font-bold tracking-tight">
          Activities
        </h1>
        <h2 className="font-sm items-center text-center text-2xl text-[#ff6865]">
            {firstName} {lastName}
        </h2>
        {/* items-center */}
        <div className="mx-auto mb-10 mt-5 flex w-5/6 justify-center rounded border bg-white p-8 lg:w-2/3">
          <div className="gradient font-family: font-serif leading-normal tracking-normal">
            <h3 className="mb-3 ml-3 text-lg font-semibold">Activities</h3>
            <ul className="w-[250px] md:w-[350px] lg:w-[500px]">
                <div className="m-2 rounded-md border bg-[#e1f3ff] p-2" >
                    Activity 1
                </div>
            </ul>
          </div>

          <div className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
            <h3 className="mb-3 ml-3 text-left text-lg font-semibold">
              Grades
            </h3>
            <ul className="w-[90px]">
                <div className="m-2 rounded-md border bg-[#e1f3ff] p-2 text-center">
                        N/A
                </div>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
