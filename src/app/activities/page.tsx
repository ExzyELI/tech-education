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
  const [grade, setGrade] = useState("")
  //const [grade1, setFirst] = useState("")
  //const [grade2, setSecond] = useState("")

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

    const handleKinder = () =>{
        setGrade("Kindergarten");
    }
    const handleFirst = () =>{
        setGrade("First");
    }
    const handleSecond = () =>{
        setGrade("Second");
    }

  return (
    <main className="font-family: flex min-h-screen flex-col bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
        <title>
            Activities
        </title>
      {/*navbar begins */}
      <Nav />
      {/* navbar ends */}

      <section className="pb-[320px] container mx-auto w-full">
        <h1 className="flex flex-col items-center justify-center pt-10 mt-5 text-5xl font-bold tracking-tight">
          Activities
        </h1>
        <div className="pt-7 text-center font-bold text-white">
            <button 
            className="px-7 py-2 mr-3 rounded-lg bg-[#FCA5A5] hover:bg-gray-300 shadow focus:bg-gray-300"
            onClick={handleKinder}>
            Kindergarten
            </button>
            <button 
            className="px-7 py-2 mx-2 rounded-lg bg-[#FCD34D] hover:bg-gray-300 shadow focus:bg-gray-300"
            onClick={handleFirst}>
            1st Grade
            </button>
            <button 
            className="px-7 py-2 ml-3 rounded-lg bg-[#afce8b] hover:bg-gray-300 shadow focus:bg-gray-300"
            onClick={handleSecond}>
            2nd Grade
            </button>
        </div>
        {/* items-center */}
        <div className ="flex-row justify-center">
            <div className="">
                <div className="mx-auto mb-2 mt-2 flex w-5/6 justify-center p-8 lg:w-[1200px]">
                {(() => {
                    switch (grade) {
                    case 'Kindergarten':
                        return <div className="gradient font-family: font-serif leading-normal tracking-normal">
                            <h3 className="mb-5 text-lg font-semibold text-center"> </h3>
                            <ul className="">
                            <div className="float-left w-60 mr-5 ml-5">
                                <a href="/MatchingGame">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/kARtwA8.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Matching Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Try to find the matching images!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/passwordActivity">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/xBa77tk.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Password Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Try to create a strong password!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/quizActivity">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/Q2dIe4V.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Quiz Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Test your computer knowledge!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className=" bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/xBa77tk.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Keyboard Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Test your keyboard matching skills!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            </ul>
                            </div>
                    case 'First':
                        return <div className="gradient font-family: font-serif leading-normal tracking-normal">
                            <h3 className="mb-5 text-lg font-semibold text-center"> </h3>
                            <ul className="">
                            <div className="float-left w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/kARtwA8.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Matching Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Try to find the matching images!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/xBa77tk.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Password Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Try to create a strong password!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/Q2dIe4V.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Quiz Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Test your computer knowledge!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className=" bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/xBa77tk.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Keyboard Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Test your keyboard matching skills!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            </ul>
                            </div>
                    case 'Second':
                        return <div className="gradient font-family: font-serif leading-normal tracking-normal">
                            <h3 className="mb-5 text-lg font-semibold text-center"> </h3>
                            <ul className="">
                            <div className="float-left w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/kARtwA8.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Matching Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Try to find the matching images!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/xBa77tk.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Password Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Try to create a strong password!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className="w-75 bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/Q2dIe4V.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Quiz Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Test your computer knowledge!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="float-right w-60 mr-5 ml-5">
                                <a href="/#">
                                    <div className=" bg-[#e1f3ff] border border-gray-200 rounded-lg shadow hover:bg-gray-300">
                                    <img className="rounded-t-lg" src="https://i.imgur.com/xBa77tk.jpeg" />
                                        <div className="p-5">
                                            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Keyboard Activity 1</h5>
                                            <p className="mb-3 font-normal text-gray-700">
                                                Test your keyboard matching skills!</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            </ul>
                            </div>
                    default:
                        return <div className="gradient font-family: font-serif leading-normal tracking-normal">
                        <h3 className="mb-5 text-lg font-semibold text-center"> </h3>
                        <ul className="">
                        <div className="float-left w-60 mr-5 ml-5">
                            <a>
                                <div className="w-75 bg-[#D3D3D3] border border-gray-200 rounded-lg shadow">
                                <img className="rounded-t-lg" src="https://i.imgur.com/0XlQMRw.jpeg" />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Matching Activity 1</h5>
                                        <p className="mb-3 font-normal text-gray-700">
                                            Select a grade to learn more!</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="float-right w-60 mr-5 ml-5">
                            <a>
                                <div className="w-75 bg-[#D3D3D3] border border-gray-200 rounded-lg shadow">
                                <img className="rounded-t-lg" src="https://i.imgur.com/EUWogLx.jpeg" />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">Password Activity 1</h5>
                                        <p className="mb-3 font-normal text-gray-700">
                                            Select a grade to learn more!</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="float-right w-60 mr-5 ml-5">
                            <a>
                                <div className="w-75 bg-[#D3D3D3] border border-gray-200 rounded-lg shadow">
                                <img className="rounded-t-lg" src="https://i.imgur.com/C7uqDLu.jpeg" />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Quiz Activity 1</h5>
                                        <p className="mb-3 font-normal text-gray-700">
                                            Select a grade to learn more!</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="float-right w-60 mr-5 ml-5">
                            <a>
                                <div className=" bg-[#D3D3D3] border border-gray-200 rounded-lg shadow">
                                <img className="rounded-t-lg" src="https://i.imgur.com/EUWogLx.jpeg" />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Keyboard Activity 1</h5>
                                        <p className="mb-3 font-normal text-gray-700">
                                            Select a grade to learn more!</p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        </ul>
                        </div>
                    }
                })()}   
                </div>
            </div>
            
        </div>
      </section>
      <div className="mb-[80px]"> </div>
      <Footer />
    </main>
  );
}
