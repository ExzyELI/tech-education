"use client";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { browserLocalPersistence, setPersistence } from "firebase/auth";
import Footer from "../../../comps/footer";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await setPersistence(auth, browserLocalPersistence);
      const res = await signInWithEmailAndPassword(email, password);
      console.log("signed in", { res });

      if (res !== undefined) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex h-screen min-h-screen items-center bg-[#e1f3ff] text-[#132241]">
        {/* container */}
        <div className="mx-auto flex w-full max-w-sm rounded-lg bg-white shadow-lg lg:max-w-4xl">
          {/* left column */}
          <div
            className="bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage: 'url("https://i.imgur.com/F9RX0cC.jpg")',
            }}
          />
          {/* right column */}
          <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <p className="mt-3 text-center text-xl font-bold">TECH EDUCATION</p>
            <p className="mt-2 text-center font-medium">Welcome back!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
