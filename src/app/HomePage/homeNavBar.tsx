'use client'
import {auth} from "@/app/firebase/init_app";
import {useRouter} from "next/navigation";
import {signOut} from "firebase/auth";

export default function HomeNavBar() {

    const router = useRouter();
    const handleSignOut = async () => {
        try {
          await signOut(auth);
          console.log("User signed out successfully");
          router.push("/sign-in");
        } catch (error) {
          console.error("Error signing out:", error);
        }
      };
    return(
        <nav className="sticky w-full border-b border-gray-200 bg-[#afce8b]">
        <header className="font-family: font-serif leading-normal tracking-normal text-[#132241]">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <span className="text-2xl font-semibold">Tech Education</span>
            {/* tabs */}
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <nav className="text-2lg">
                <a
                  href="/MatchingGame"
                  className="cursor-pointer px-3 text-lg font-semibold text-[#132241] hover:text-[#5c6ac4]"
                >
                  Activities
                </a>
                <a
                  href="/grades"
                  className="cursor-pointer px-3 text-lg font-semibold text-[#132241] hover:text-[#5c6ac4]"
                >
                  Grade
                </a>
                <a
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold text-[#132241] hover:text-[#5c6ac4]"
                >
                  Reports
                </a>
                <a
                  href="/Classroom"
                  className="cursor-pointer px-3 text-lg font-semibold text-[#132241] hover:text-[#5c6ac4]"
                >
                  Classroom
                </a>
                <a
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold text-[#132241] hover:text-[#5c6ac4]"
                >
                  Profile
                </a>
                <button
                  type="button"
                  className="rounded-lg bg-[#ffe08d] px-6 py-2 text-center text-sm font-medium hover:bg-[#ffd564] md:me-2 lg:me-2"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </nav>
            </div>
          </div>
        </header>
      </nav>
    )
}