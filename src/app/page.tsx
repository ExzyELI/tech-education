export default function Home() {
  return (
    <main className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      {/*navbar begins */}
      <nav className="sticky w-full border-b border-gray-200 bg-[#afce8b]">
        <header className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              {" "}
              Tech Education
            </span>
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
      <section className="border-b bg-[#ffecde]">
        <div className="px-6 pb-10 text-center md:px-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <header className="gradient flex w-full items-center justify-center py-3 font-serif text-6xl leading-normal tracking-normal text-[#132241] ">
              My Classroom
            </header>

            {/* three sections */}
            <div className="grid grid-flow-col grid-rows-4 gap-10 text-center ">
              <div className="row-span- col-span-1 rounded-md border-2 border-gray-500 bg-[#e1f3ff]">
                <div className="bg-[#a8cd87] py-1 font-semibold text-[#132241]">
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
              <div className="col-span-1 inline-grid rounded-lg border-2 border-gray-500 bg-[#e1f3ff] ">
                <div className="bg-[#a8cd87] py-1 font-semibold text-[#132241] ">
                  Actions
                </div>
                <table className="flex table-auto flex-col items-center justify-center">
                  <tbody>
                    <tr className="cursor-pointer hover:text-[#5c6ac4]">
                      {/* create a Tname option that changes according to Tname */}
                      <td>Change Classroom</td>
                    </tr>
                    <tr className="cursor-pointer hover:text-[#5c6ac4]">
                      {/* create a class naming option so class name changes depending on classroom */}
                      <td>Add Student</td>
                    </tr>
                    <tr className="cursor-pointer hover:text-[#5c6ac4]">
                      {/* create a pin option so students can join classroom */}
                      <td>Remove Student</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-span-1 row-span-7 rounded-lg border-2 border-gray-500 bg-[#e1f3ff]">
                <div className="bg-[#a8cd87] py-1 font-semibold text-[#132241]">
                  Students
                </div>
                {/* ADD Student Feature */}
                <table className="flex table-auto flex-col border-b border-gray-500">
                  <tbody>
                    <tr className="flex border-b border-gray-500">
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

      {/* footer begins */}
      <footer className="sticky w-full bg-[#afce8b]">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-center px-4 py-4">
          <span className="text-sm sm:text-center ">
            © 2024 Tech Education™
          </span>
        </div>
      </footer>
      {/* footer ends */}
    </main>
  );
}
