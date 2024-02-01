import Image from "next/image";

export default function Home() {
  return (
    <main className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
      <title>Tech Education</title>
      {/* navbar begins */}
      <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-[#afce8b]">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <span className="self-center whitespace-nowrap text-2xl font-semibold">
            Tech Education
          </span>
          {/* tabs */}
          <nav className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <a href="#" className="text-[#132241] text-lg px-3 font-semibold hover:text-[#5c6ac4]">Home</a>
            <a href="#" className="text-[#132241] text-lg px-3 font-semibold hover:text-[#5c6ac4]">Activities</a>
            <a href="#" className="text-[#132241] text-lg px-3 font-semibold hover:text-[#5c6ac4]">Analytics</a>
            <a href="#" className="text-[#132241] text-lg px-3 font-semibold hover:text-[#5c6ac4]">My Account</a>
          </nav>
        </div>
      </nav>
      {/* navbar ends */}

      {/* banner begins */}
      <section className="-mb-[105px] border-b bg-[#ffecde] lg:-mt-5">
        <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
        <section className="container mx-auto py-3 flex flex-col items-center ">
        <h1 className="text-orange-500 text-7xl font-bold">Classroom</h1>
        </section>
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            {/* left column for text */}
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div className="grid items-center gap-12 lg:grid-cols-2">
                <h1>hello</h1>
                {/* left column for text */}
              </div>
              {/* right column for image */}
              <h1>hello</h1>
            </div>
          </div>
        </div>
      </section>
      
    <div className="flex flex-col min-h-screen bg-white">
          <div className="flex-1 flex flex-col">
            <div className="bg-black opacity-10 px-2 py-1 font-bold">Teacher Info Box</div>
            <div className="bg-black opacity-5 py-20 px-2 py-1">Info</div>

            <div className="text-white">spacer</div>
            
            <div className="bg-black opacity-10 px-2 font-bold py-1">Actions</div>
            <div className="bg-black opacity-5 py-20 px-2 py-1">Info</div>
            <div className="bg-white">Box 2</div>
            </div>
            <div className="flex-1 bg-black opacity-10 px-2 font-bold py-1">
              <header className="font-bold text-orange ">Big Box</header>
            </div>
      </div>
      
      {/* footer begins */}
      <footer className="bg-[#afce8b]">
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