"use client";
import { auth, handleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Footer from "../../../comps/footer";
import MatchingNavBar from "./MatchingNavBar";

export default function Home() {
  handleRedirect();
  const router = useRouter();

  return (
    <main>
      {/*navbar begins */}
      <MatchingNavBar/>
      {/* navbar ends */}
      <div className="font-family: font-serif leading-normal tracking-normal text-[#132241]">

      </div>
      
      <div className="flex h-screen min-h-screen items-center bg-gradient-to-br from-[#fdf4ed] to-[#ffecde] text-[#434343]">
        <div className="container bg-black"></div> 
      </div>
      

      {/* Start Matching Game */}
      <section ></section>

      <Footer />
      </main>
      );
    }