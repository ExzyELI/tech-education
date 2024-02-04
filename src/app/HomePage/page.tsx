export default function Home() {
  return (
    <main className="font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      {/*navbar begins */}
      <nav className="sticky w-full border-b border-gray-200 bg-[#afce8b]">
        <header className="font-family: font-serif leading-normal tracking-normal">
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
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
                >
                  Activities
                </a>
                <a
                  href="#"
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
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
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

              <p className="text-center text-xs text-[#ff6865]">
                <a
                  href="https://www.vectorstock.com/royalty-free-vector/teacher-sitting-classroom-with-chalkboard-vector-43444042"
                  target="_blank"
                >
                  img source
                </a>
              </p>
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
            {/* mouse image end */}
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
