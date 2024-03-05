"use client";
import { useHandleRedirect } from "@/app/firebase/init_app";
import { useRouter } from "next/navigation";
import Footer from "../../../comps/footer";
import Nav from "../../../comps/nav";

export default function Home() {
  const router = useRouter();
  useHandleRedirect();

  return (
    <div className="font-family: flex min-h-screen flex-col bg-[#ffecde] font-serif leading-normal tracking-normal text-[#132241]">
      {/*navbar begins */}
      <Nav />
      {/* navbar ends */}

      <section className="container mx-auto w-full py-5">
        <h1 className="flex flex-col items-center justify-center pt-4 text-5xl font-bold tracking-tight">
          Grades
        </h1>
        <h2 className="font-sm items-center text-center text-2xl text-[#ff6865]">
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
