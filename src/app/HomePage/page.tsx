"use client";
import { Carousel } from "@material-tailwind/react";
import { auth, useHandleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
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
            

            {/* game cards */}
            <Carousel className="rounded-xl flex items-center h-[400px] w-full" keyboard={false}>
  <div className="w-full">
    <button className="h-[400px] w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 transform transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500">
  <h1 className="text-center text-5xl font-semibold tracking-tight">
    Keyboard Quest
  </h1>
  <h2>Find the Keyboard Keys!</h2>
</button>

  </div>
  <div className="w-full">
    <button className="h-[400px] w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500">
      <h1 className="text-center text-5xl font-semibold tracking-tight">
        Tech Trivia
      </h1>
      <h2>Let's See How Tech Savvy You Are!</h2>
    </button>
  </div>
  <div className="w-full">
    <button className="h-[400px] w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500">
      <h1 className="text-center text-5xl font-semibold tracking-tight">
        Password Protecter
      </h1>
      <h2>Build Your Top Secret Password!</h2>
    </button>
  </div>
  <div className="w-full">
    <button className="h-[400px]  w-full rounded-md bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500">
      <h1 className="text-center text-5xl font-semibold tracking-tight">
        Tech Tango
      </h1>
      <h2>Match the Gadgets!</h2>
    </button>
  </div>
</Carousel>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
