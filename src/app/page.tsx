import Image from "next/image";


{/*Student HomePage */}
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
      <section className="pb-[100px] border-b bg-[#ffecde] lg:-mt-5">
        <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">

              <div className=" flex justify-center lg:mt-[50px]">
                {/* title */}
                <h1 className="text-6xl font-bold tracking-tight md:text-5xl lg:mb-16 lg:ml-[80px] lg:text-5xl">
                  Welcome to Tech Education!
                  </h1>
                  </div>
                  {/* title */}
                  <div className="cursor-pointer flex justify-center items-center py-2">
                    <a href="#" className="w-1/4 h-[280px] bg-[#e1f3ff] rounded-md m-2 hover:scale-105 transition-transform flex justify-center items-center">
                      <h1 className="text-3xl text-center font-semibold tracking-tight">Kindergarten</h1>
                      </a>
                      <a href="#" className="w-1/4 h-[280px] bg-[#e1f3ff] rounded-md m-2 hover:scale-105 transition-transform flex justify-center items-center">
                        <h1 className="text-3xl text-center font-semibold tracking-tight">1st <br />Grade</h1>
                        </a>
                        <a href="#" className="w-1/4 h-[280px] bg-[#e1f3ff] rounded-md m-2 hover:scale-105 transition-transform flex justify-center items-center">
                          <h1 className="text-3xl text-center font-semibold tracking-tight">2nd <br />Grade</h1>
                          </a>
                          </div>
                          {/* Image */}
                          </div>
                          </div>
                          </section>
      {/* banner ends */}

      {/* footer begins */}
      <footer className="fixed bottom-0 left-0 right-0 bg-[#afce8b]">
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

