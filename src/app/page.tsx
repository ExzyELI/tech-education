{
  /*Student HomePage */
}
export default function Home() {
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
                  href="#"
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
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold text-[#132241] hover:text-[#5c6ac4]"
                >
                  Profile
                </a>
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
            <div className="flex justify-center">
              {/* title */}
              <h1 className="pb-10 text-5xl font-bold tracking-tight">
                Welcome to Tech Education!
              </h1>
            </div>
            {/* title */}
            <div className="flex cursor-pointer items-center justify-center py-2">
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
            {/* Image */}
          </div>
        </div>
      </section>
      {/* banner ends */}

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
