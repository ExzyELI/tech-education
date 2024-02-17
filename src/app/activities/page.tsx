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
        <div className ="flex-row justify-center">
            <div className="mx-auto mb-10 mt-5 flex w-5/6 justify-center rounded border bg-white p-8 lg:w-1/2 float-left">
                    
                <div className="gradient font-family: font-serif leading-normal tracking-normal">
                    <h3 className="mb-3 ml-3 text-lg font-semibold">Kindergarten Activities</h3>
                    <ul className="">
                    <div className="float-left w-60 ml-5">
                        <a href="/MatchingGame">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow ">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Matching Activity 1</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Try to find the matching images!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-right w-60 mr-5">
                        <a href="/passwordActivity">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Password Activity 1</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Try to create a strong password!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-left pt-5 w-60 ml-5">
                        <a href="#">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Quiz Activity 1</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Test your computer knowledge!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-right pt-5 w-60 mr-5">
                        <a href="#">
                            <div className=" bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Puzzle Activity 1</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Solve some puzzles and learn!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    </ul>
                </div>
            </div>

            <div className="mx-auto mb-10 mt-5 flex w-5/6 justify-center rounded border bg-white p-8 lg:w-1/2 float-right">
                
                <div className="gradient font-family: font-serif leading-normal tracking-normal">
                    <h3 className="mb-3 ml-3 text-lg font-semibold">1st Grade Activities</h3>
                    <ul className="">
                    <div className="float-left w-60 ml-5">
                        <a href="#">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Matching Activity 2</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Try to find the matching images!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-right w-60 mr-5">
                        <a href="#">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Password Activity 2</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Try to create a strong password!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-left pt-5 w-60 ml-5">
                        <a href="#">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Quiz Activity 2</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Test your computer knowledge!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-right pt-5 w-60 mr-5">
                        <a href="#">
                            <div className=" bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Puzzle Activity 2</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Solve some puzzles and learn!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    </ul>
                </div>
            </div>
            
            <div className="mx-auto mb-10 mt-5 flex w-5/6 justify-center rounded border bg-white p-8 lg:w-1/2">
                
                <div className="gradient font-family: font-serif leading-normal tracking-normal">
                    <h3 className="mb-3 ml-3 text-lg font-semibold">2st Grade Activities</h3>
                    <ul className="">
                    <div className="float-left w-60 ml-5">
                        <a href="#">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Matching Activity 3</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Try to find the matching images!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-right w-60 mr-5">
                        <a href="#">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Password Activity 3</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Try to create a strong password!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-left pt-5 w-60 ml-5">
                        <a href="#">
                            <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Quiz Activity 3</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Test your computer knowledge!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    <div className="float-right pt-5 w-60 mr-5">
                        <a href="#">
                            <div className=" bg-[#e1f3ff] border border-gray-200 rounded-lg shadow">
                                <div className="p-5">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Puzzle Activity 3</h5>
                                    <p className="mb-3 font-normal text-gray-700">
                                        Solve some puzzles and learn!</p>
                                </div>
                            </div>
                        </a>
                    </div>
                    </ul>
                </div>
            </div>
            
        </div>
      </section>
      <Footer />
    </main>
  );
}
