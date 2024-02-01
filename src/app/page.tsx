import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
        <div className="fixed start-0 top-0 z-20 w-full border-b border-gray-200 bg-[#afce8b] flex justify-between items-center px-4 py-2">
          <h1 className="cursor-pointer text-xl font-bold hover:text-2xl transition-all duration-800 ">Tech Education</h1>
          <div className="flex text-lg">
            <label className="mr-5 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:bg-orange-500 hover:text-white hover:p-1 hover:rounded">Activities</label>
            <label className="mr-5 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:bg-orange-500 hover:text-white hover:p-1 hover:rounded">Grade</label>
            <label className="mr-5 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:bg-orange-500 hover:text-white hover:p-1 hover:rounded">Reports</label>
          </div>
        </div>
      </header>


      <section className="container mx-auto py-20">
        <h1 className="text-orange-500 text-7xl font-bold py-1">Activity Grades</h1>
        <h2 className="text-black opacity-20 text-5xl font-bold">Coming soon</h2>
        </section>

    

      <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-center px-4 py-4">
          <span className="text-sm sm:text-center ">
            © 2024 Tech Education™
          </span>
        </div>
      </footer>
    </div>
  );
}