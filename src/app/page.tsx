import Image from "next/image";

export default function Home() {
  return (
    <main className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      {/*navbar begins */}
    <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-[#afce8b]">
      <header className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <span className="self-center whitespace-nowrap text-2xl font-semibold"> Tech Education
            </span>
            {/* tabs */}
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <nav className="text-2lg">
                <a href="#" className="text-[#132241] cursor-pointer text-lg px-3 font-semibold hover:text-[#5c6ac4]">Activities</a>
                <a href="#" className="text-[#132241] cursor-pointer text-lg px-3 font-semibold hover:text-[#5c6ac4]">Grade</a>
                <a href="#" className="text-[#132241] cursor-pointer text-lg px-3 font-semibold hover:text-[#5c6ac4]">Reports</a>
                <a href="#" className="text-[#132241] cursor-pointer text-lg px-3 font-semibold hover:text-[#5c6ac4]">Profile</a>
                </nav>
            </div>
        </div>
      </header>
      </nav>
      {/* navbar ends */}

      {/* banner begins */}
      <section className="-mb-[105px] border-b bg-[#ffecde] lg:-mt-5">
        <div className="px-6 py-20 text-center md:px-12 lg:my-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <header className="w-full flex py-3 text-6xl items-center justify-center gradient font-serif leading-normal tracking-normal text-[#132241] "> My Classroom </header>
            
            {/* three sections */}
            <div className="text-center grid grid-flow-col grid-rows-4 gap-10 ">
              <div className="rounded-md border-2 border-gray-500 row-span- col-span-1 bg-[#e1f3ff]">
                <div className="bg-[#a8cd87] py-1 text-[#132241] font-semibold">Teacher Info</div>
                <table className="table-auto flex flex-col justify-center items-center">
                  <tbody>
                  <tr>
                    {/* create a Tname option that changes according to Tname */}
                    <td>Name:</td>
                    <td>Naruto Uzumaki </td>
                  </tr><tr>
                    {/* create a class naming option so class name changes depending on classroom */}
                    <td>Class:</td>
                    <td>Akatsuki</td>
                  </tr><tr>
                    {/* create a pin option so students can join classroom */}
                    <td>PIN:</td>
                    <td className="blur-sm hover:blur-none ">1234</td>

                  </tr>
                  </tbody>
                </table>
                  
              </div>
              <div className="rounded-lg border-2 border-gray-500 inline-grid col-span-1 bg-[#e1f3ff] ">
                <div className="bg-[#a8cd87] py-1 text-[#132241] font-semibold ">Actions</div>
                <table className="table-auto flex flex-col justify-center items-center">
                  <tbody>
                  <tr className="hover:text-[#5c6ac4] cursor-pointer">
                    {/* create a Tname option that changes according to Tname */}
                    <td>Change Classroom</td>
                  </tr><tr className="hover:text-[#5c6ac4] cursor-pointer">
                    {/* create a class naming option so class name changes depending on classroom */}
                    <td>Add Student</td>
                  </tr><tr className="hover:text-[#5c6ac4] cursor-pointer">
                    {/* create a pin option so students can join classroom */}
                    <td>Remove Student</td>
                  </tr>
                  </tbody>
                </table>
                </div>
              <div className="rounded-lg border-2 border-gray-500 row-span-7 col-span-1 bg-[#e1f3ff]">
                <div className="bg-[#a8cd87] py-1 text-[#132241] font-semibold">Students</div>
                {/* ADD Student Feature */}
                <table className="border-b border-gray-500 table-auto flex flex-col">
                  <tbody>
                    <tr className="border-b border-gray-500 flex">
                      <td>
                        John Doe
                      </td>
                    </tr>
                    <tr>
                      <td>
                        Ricky Stue
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* footer begins */}
      <footer className="bg-[#afce8b] fixed bottom-0 w-full">
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