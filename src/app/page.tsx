import Image from "next/image";

export default function Home() {
  return (
    
    <div className="flex flex-col min-h-screen bg-white">
      <header className="bg-white text-black py-3">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="cursor-pointer text-xl font-bold hover:text-2xl transition-all duration-800 ">Tech Education</h1>
        </div>
      </header>


      <section className="container mx-auto py-3 flex flex-col items-center ">
        <h1 className="text-orange-500 text-7xl font-bold">Classroom</h1>
        <h2 className="text-black opacity-20 text-2xl font-bold py-1"> (class name) </h2>
        </section>
        <section className="container mx-auto flex">
          <div className="flex-1 flex flex-col">
            <div className="bg-black opacity-10 px-2 py-1 font-bold">Teacher Info Box</div>
            <div className="bg-black opacity-5 py-20 px-2 py-1">Info</div>

            <div className="bg-white opactiy-10">spacer</div>
            
            <div className="bg-black opacity-10 px-2 font-bold py-1">Actions</div>
            <div className="bg-black opacity-5 py-20 px-2 py-1">Info</div>
            <div className="bg-white">Box 2</div>
            </div>
            <div className="flex-1 bg-black opacity-10 px-2 font-bold py-1">
              <header className="font-bold text-orange ">Big Box</header>
            </div>
            
            </section>
    

      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mt-auto text-2xl mx-20 ">
          <p className="text-sm font-bold py-1"> created by Tech Education Group </p>
        </div>
      </footer>
    </div>
  );
}