"use client";
import { auth, handleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Footer from "../../../comps/footer";
import MatchingNavBar from "./MatchingNavBar";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { User } from "firebase/auth";
import { shuffle } from "lodash";

export default function Home() {
  
  const [cards, setCards] = useState(Array.from(Array(16).keys())); 

  
  useEffect(() => {
    setCards((prevCards) => shuffle(prevCards)); 
  }, []);


  const handleCardClick = (index: any) => {
    console.log("Clicked card:", index);
  };
  return (
    <main>
      {/*navbar begins */}
      <MatchingNavBar/>
      {/* navbar ends */}
      <div className="font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <div className="flex h-screen min-h-screen bg-gradient-to-br from-[#fdf4ed] to-[#ffecde] text-[#434343]">
        <div className="container bg-black">
        <div className="font-serif leading-normal tracking-normal text-[#132241]">
        <div className="flex h-screen min-h-screen bg-gradient-to-br from-[#fdf4ed] to-[#ffecde] text-[#434343]">
          <div className="container mx-auto py-6 px-[300px]">
            <h1 className="text-4xl font-bold text-center mt-2">Match the Tech!</h1>
            <p className="text-xl text-center mt-4">Instructions: Click on cards to match them.</p>
            
            <div className="container border-dashed border-4 border-sky-300 bg-sky-200 py-2 px-4 mt-8">
            <section className="tiles grid grid-cols-4 gap-3 justify-items-center ">
            <button className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center memory-card">1</button>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">2</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">3</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">4</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">5</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">6</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">7</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">8</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">9</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">10</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">11</div>
            <div className="w-40 h-40 rounded-lg bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline focus:ring focus:ring-black text-white flex justify-center items-center">12</div>
            </section>
            </div>
            
          </div>
        </div>
      </div></div> 
      </div>
      </div>

      <Footer />
      </main>
      );
    }