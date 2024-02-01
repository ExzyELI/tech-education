import Image from "next/image";

export default function Home() {
  return (
    <main>
    <div className="flex flex-col min-h-screen bg-white">
      <header className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
        <div className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-[#afce8b] flex justify-between items-center px-4 py-5"> 
          <h1 className="cursor-pointer text-xl font-bold ">Tech Education</h1>
          <nav className="text-2lg">
            <a href="#" className="text-[#132241] cursor-pointer text-lg px-3 font-semibold hover:text-[#5c6ac4]">Activities</a>
            <a href="#" className="text-[#132241] cursor-pointer text-lg px-3 font-semibold hover:text-[#5c6ac4]">Grade</a>
            <a href="#" className="text-[#132241] cursor-pointer text-lg px-3 font-semibold hover:text-[#5c6ac4]">Reports</a>
            <a href="#" className="text-[#132241] cursor-pointer text-lg px-3 font-semibold hover:text-[#5c6ac4]">Profile</a>
          </nav>
        </div>
      </header>
      <section className="absolute top-20 w-full text-center ">
        <h1 className="text-black text-5xl font-bold py-1 tracking-tight md:text-5xl lg:mb-16 lg:ml-[80px] lg:text-5xl ">Welcome to Tech Education!</h1>
        <h2 className="text-black text-5xl font-bold">...</h2>
        </section>
        <div className="cursor-pointer flex justify-center mt-[220px] ">
        <a href="#" className="w-1/4 h-[300px] bg-[#e1f3ff] rounded-md m-2 hover:scale-105 transition-transform">
          <h1 className="text-3xl text-center font-semibold ">Kindergarden</h1>
        </a>
        <a href="#" className="w-1/4 h-[300px] bg-[#e1f3ff] rounded-md m-2 hover:scale-105 transition-transform">
          <h1 className="text-3xl text-center font-semibold">1st Grade</h1>
        </a>
        <a href="#" className="w-1/4 h-[300px] bg-[#e1f3ff] rounded-md m-2 hover:scale-105 transition-transform">
          <h1 className="text-3xl text-center font-semibold">2nd Grade</h1>
        </a>
      </div>

      <footer className="bg-[#ffe08d]">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-center px-4 py-4">
          <span className="text-sm sm:text-center ">
            © 2024 Tech Education™
          </span>
        </div>
      </footer>
      </div>
      </main>
  );
}

