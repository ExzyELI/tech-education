"use client";
import { auth, useHandleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";
import React, { useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { User } from "firebase/auth";

export default function Home() {
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
    <main className="font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      {/*navbar begins */}
      <Nav />
      {/* navbar ends */}

      {/* banner begins */}
      <section className="min-h-screen bg-[#ffecde] pt-10">
        <div className="text-center md:px-12 lg:text-left">
          <div>
            <div className="flex flex-col items-center justify-center">
              {/* title */}
              <h1 className="text-center text-5xl font-bold tracking-tight">
                Welcome {firstName} {lastName}!
              </h1>

              {/* mouse image start */}
              <div className="flex items-center justify-center">
                <div className="h-[300px] w-[300px] hover:animate-bounce ">
                  <img
                    src="/vectorstock_4995646_transparent.png"
                    alt="Computer Mouse"
                  />
                </div>
              </div>
              {/* mouse image end */}
            </div>

            {/* title */}
            <div className="-mt-[70px] flex cursor-pointer flex-col items-center justify-center py-2 pb-20 lg:flex-row">
              <a
                href="#"
                className="delay-50 m-2 flex h-[280px] w-2/3 items-center justify-center rounded-md bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500 lg:w-1/4"
              >
                <h1 className="text-center text-3xl font-semibold tracking-tight">
                  Kindergarten
                </h1>
              </a>
              <a
                href="#"
                className="delay-50 m-2 flex h-[280px] w-2/3 items-center justify-center rounded-md bg-[#e1f3ff] bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500 lg:w-1/4"
              >
                <h1 className="text-center text-3xl font-semibold tracking-tight">
                  1st <br />
                  Grade
                </h1>
              </a>
              <a
                href="#"
                className="delay-50 m-2 flex h-[280px] w-2/3 items-center justify-center rounded-md bg-[#e1f3ff] bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500 lg:w-1/4"
              >
                <h1 className="text-center text-3xl font-semibold tracking-tight">
                  2nd <br />
                  Grade
                </h1>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
