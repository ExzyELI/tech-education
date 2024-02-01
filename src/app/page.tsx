import Image from "next/image";
import "./ActivityScroll.css"
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
        <h1 className="text-orange-500 text-7xl font-bold py-1">Grades</h1>
        <h2 className="text-black opacity-20 text-5xl font-bold">Student name</h2>
        <div className="flex justify-between mt-10">
          <div className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
            <h3 className="text-xl font-semibold mb-3">Activities</h3>

            <ul>
              {/* Activity colors for odds and evens*/}
              <div className="activity-box">this is a long name for an activiy for testing purposes</div>
              <div className="activity-box">Activity 2</div>
              <div className="activity-box">Activity 3</div>
              <div className="activity-box">Activity 4</div>
              <div className="activity-box">Activity 5</div>
              <div className="activity-box">Activity 6</div>
              <div className="activity-box">Activity 7</div>
              <div className="activity-box">Activity 8</div>
              <div className="activity-box">Activity 9</div>
              <div className="activity-box">Activity 10</div>
            </ul>
          </div>
          <div className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
            <h3 className="text-xl font-semibold mb-3">Grades</h3>
            <ul>
              {/* Wrap each grade in a div with a custom class */}
              <div className="grade-box">5/10</div>
              <div className="grade-box">10/10</div>
              <div className="grade-box">5/10</div>
              <div className="grade-box">10/10</div>
              <div className="grade-box">5/10</div>
              <div className="grade-box">10/10</div>
              <div className="grade-box">5/10</div>
              <div className="grade-box">10/10</div>
              <div className="grade-box">5/10</div>
              <div className="grade-box">10/10</div>
              
            </ul>
          </div>
        </div>
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