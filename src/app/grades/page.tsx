"use client";
import { auth, handleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../../../comps/footer";

export default function Home() {
  const router = useRouter();
  handleRedirect();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      router.push("/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
  return (
    <div className="font-family: flex min-h-screen flex-col bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
      {/*navbar begins */}
      <nav className="sticky w-full border-b border-gray-200 bg-[#afce8b]">
        <header className="font-family: font-serif leading-normal tracking-normal">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <span className="text-2xl font-semibold">Tech Education</span>
            {/* tabs */}
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <nav className="text-2lg">
                <a
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
                >
                  Activities
                </a>
                <a
                  href="/grades"
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
                >
                  Grade
                </a>
                <a
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
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
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
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

      <section className="container mx-auto w-full py-5">
        <h1 className="flex w-full items-center justify-center py-3 font-serif text-5xl leading-normal tracking-normal">
          Grades
        </h1>
        <h2 className="font-sm -mt-[20px] items-center text-center text-2xl text-[#ff6865]">
          Student name
        </h2>
        <div className="mx-auto mb-10 mt-5 flex w-5/6 items-center justify-center rounded border bg-white p-8 lg:w-2/3">
          <div className="gradient font-family: font-serif leading-normal tracking-normal">
            <h3 className="mb-3 ml-3 text-lg font-semibold">Activities</h3>
            <ul className="w-[250px] md:w-[350px] lg:w-[500px]">
              {/* array for activity colors for odds and evens */}
              {Array(10)
                .fill(true)
                .map((_, index) => {
                  if (index % 2 == 0) {
                    return (
                      <div
                        key={index}
                        className="m-2 rounded-md border bg-[#e1f3ff] p-2"
                      >
                        Activity {index + 1}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="m-2 rounded-md border bg-[#e8f8da] p-2"
                      >
                        Activity {index + 1}
                      </div>
                    );
                  }
                })}
            </ul>
          </div>

          <div className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
            <h3 className="mb-3 ml-3 text-left text-lg font-semibold">
              Grades
            </h3>
            <ul className="w-[90px]">
              {/* array for grades to have a different color for odds and evens */}
              {Array(10)
                .fill(true)
                .map((_, index) => {
                  if (index % 2 == 0) {
                    return (
                      <div
                        key={index}
                        className="m-2 rounded-md border bg-[#e1f3ff] p-2 text-center"
                      >
                        5/10
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="m-2 rounded-md border bg-[#e8f8da] p-2 text-center"
                      >
                        10/10
                      </div>
                    );
                  }
                })}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
