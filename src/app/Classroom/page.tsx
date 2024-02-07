"use client";
import { auth, handleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import Footer from "../../../comps/footer";
import ClassNavBar from "./classNavBar";


export default function Home() {
  handleRedirect();
  const router = useRouter();

  return (
    <main className="font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      {/*navbar begins */}
      <ClassNavBar/>
      {/* navbar ends */}

      {/* banner begins */}
      <section className="border-b bg-[#ffecde]">
        <div className="px-6 pb-10 text-center md:px-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <header className="flex w-full items-center justify-center py-3 font-serif text-5xl leading-normal tracking-normal">
              My Classroom
            </header>

            <div className="col-span-1 row-span-1 mb-10">
              <div className="flex items-center justify-center object-center">
                <img
                  className="h-[250px]"
                  src="https://i.imgur.com/1EDuUBO.png"
                />
              </div>
            </div>

            {/* three sections */}
            <div className="grid grid-flow-col grid-rows-4 gap-10 text-center ">
              <div className="col-span-1 row-span-1 rounded-md border border-gray-200 bg-white">
                <div className="rounded-t-md bg-[#e1f3ff] py-1 font-semibold">
                  Teacher Info
                </div>
                <table className="flex table-auto flex-col items-center justify-center">
                  <tbody>
                    <tr>
                      {/* create a Tname option that changes according to Tname */}
                      <td>Name:</td>
                      <td>Naruto Uzumaki </td>
                    </tr>
                    <tr>
                      {/* create a class naming option so class name changes depending on classroom */}
                      <td>Class:</td>
                      <td>Akatsuki</td>
                    </tr>
                    <tr>
                      {/* create a pin option so students can join classroom */}
                      <td>PIN:</td>
                      <td className="blur-sm hover:blur-none ">1234</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-span-1 row-span-1 rounded-md border border-gray-200 bg-white">
                <div className="rounded-t-md bg-[#e1f3ff] py-1 font-semibold">
                  Actions
                </div>
                <table className="flex table-auto flex-col items-center justify-center">
                  <tbody>
                    <tr className="cursor-pointer hover:text-[#ff6865]">
                      {/* create a Tname option that changes according to Tname */}
                      <td>Change Classroom</td>
                    </tr>
                    <tr className="cursor-pointer hover:text-[#ff6865]">
                      {/* create a class naming option so class name changes depending on classroom */}
                      <td>Add Student</td>
                    </tr>
                    <tr className="cursor-pointer hover:text-[#ff6865]">
                      {/* create a pin option so students can join classroom */}
                      <td>Remove Student</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="col-span-1 row-span-3 rounded-md border border-gray-200 bg-white">
                <div className="rounded-t-md bg-[#e1f3ff] py-1 font-semibold">
                  Students
                </div>
                {/* ADD Student Feature */}
                <table className="flex table-auto flex-col border-b border-gray-200">
                  <tbody>
                    <tr className="flex border-b border-gray-200">
                      <td>John Doe</td>
                    </tr>
                    <tr>
                      <td>Ricky Stue</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
