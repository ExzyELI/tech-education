"use client";
import {auth, handleRedirect} from "@/app/firebase/init_app";
import {useRouter} from "next/navigation";
import {signOut} from "firebase/auth";
{
  /*Student HomePage */
}
export default function Home() {

  handleRedirect();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out successfully');
      router.push("/sign-in");
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <main className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      {/*navbar begins */}
      <nav className="sticky w-full border-b border-gray-200 bg-[#afce8b]">
        <header className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <span className="text-2xl font-semibold">Tech Education</span>
            {/* tabs */}
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <nav className="text-2lg">
                <a
                  href="#"
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
      {/* navbar ends */}

      {/* banner begins */}
      <section className="min-h-screen bg-[#ffecde] pt-10">
        <div className="text-center md:px-12 lg:text-left">
          <div>
            <div className="flex flex-col items-center justify-center">
              {/* title */}
              <h1 className="text-5xl font-bold tracking-tight">
                Welcome to Tech Education!
              </h1>
              <p>
                <a
                  className="text-xs text-[#ff6865]"
                  href="https://www.vectorstock.com/royalty-free-vector/computer-mouse-vector-4995646"
                  target="_blank"
                >
                  img source
                </a>
              </p>

              {/* mouse image start */}
              <div className="relative -mt-[40px] flex items-center justify-center">
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
            <div className="-mt-[70px] flex cursor-pointer items-center justify-center py-2 pb-20">
              <a
                href="#"
                className="delay-50 m-2 flex h-[280px] w-1/4 items-center justify-center rounded-md bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500"
              >
                <h1 className="text-center text-3xl font-semibold tracking-tight">
                  Kindergarten
                </h1>
              </a>
              <a
                href="#"
                className="delay-50 m-2 flex h-[280px] w-1/4 items-center justify-center rounded-md bg-[#e1f3ff] bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500"
              >
                <h1 className="text-center text-3xl font-semibold tracking-tight">
                  1st <br />
                  Grade
                </h1>
              </a>
              <a
                href="#"
                className="delay-50 m-2 flex h-[280px] w-1/4 items-center justify-center rounded-md bg-[#e1f3ff] bg-gradient-to-r from-green-400 to-blue-500 transition-transform hover:scale-105 hover:from-green-400 hover:via-[#ffe08d] hover:to-blue-500"
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

      {/* footer begins */}
      <footer className="sticky bg-[#afce8b]">
        <div className="flex w-full items-center justify-center px-4 py-4">
          <span className="text-sm">© 2024 Tech Education™</span>
        </div>
      </footer>
      {/* footer ends */}
    </main>
  );
}
