import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-white text-black py-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="cursor-pointer text-xl font-bold hover:text-2xl transition-all duration-800 ">Tech Education</h1>
          <div className="flex text-lg">
            <label className="mr-5 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:bg-orange-500 hover:text-white hover:p-1 hover:rounded">Activities</label>
            <label className="mr-5 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:bg-orange-500 hover:text-white hover:p-1 hover:rounded">Grade</label>
            <label className="mr-5 cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:bg-orange-500 hover:text-white hover:p-1 hover:rounded">Reports</label>
          </div>
        </div>
      </header>


      <section className="container mx-auto py-20">
        <h1 className="text-orange-500 text-7xl font-bold py-1">Welcome to our Homepage</h1>
        <h2 className="text-black opacity-20 text-5xl font-bold">Coming soon</h2>
        </section>

    

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mt-auto text-2xl mx-20 ">
          <p> footer </p>
        </div>
      </footer>
    </div>
  );
}
