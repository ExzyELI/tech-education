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
          {/* buttons */}
          <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <button
              type="button"
              className="rounded-lg bg-[#ffe08d] px-6 py-2 text-center text-sm font-medium hover:bg-[#ffd564] md:me-2 lg:me-2"
            >
              Login
            </button>
            <button
              type="button"
              className="rounded-lg bg-[#ffe08d] px-5 py-2 text-center text-sm font-medium hover:bg-[#ffd564]"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>
      {/* navbar ends */}

      {/* banner begins */}
      <section className="-mb-[105px] border-b bg-[#ffecde] lg:-mt-5">
        <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* left column for text */}
              <div className="mt-12 lg:mt-[105px]">
                <h1 className="text-5xl font-bold tracking-tight md:text-5xl lg:mb-16 lg:ml-[80px] lg:text-5xl">
                  Technology education <br />
                  <span className="text-primary">for grades k-2</span>
                  <p className="mt-5 whitespace-normal text-2xl font-medium">
                    Join us today to gain exclusive access to educational
                    material for your student or child{" "}
                    <br className="whitespace-normal"></br>
                    {/* link for the image source */}
                    <a
                      className="text-xs text-[#a8cd87]"
                      href="https://www.vectorstock.com/royalty-free-vector/home-education-parent-teaching-child-mother-vector-46882075"
                    >
                      img source
                    </a>
                  </p>
                </h1>
              </div>
              {/* right column for image */}
              <div className="-mb-[96px]">
                <img src="https://i.imgur.com/4x0P6w8.png" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* banner ends */}

      {/* mission statement begins */}
      <section className="relative mt-[95px] border-y bg-[#e1f3ff] pb-4 pt-[60px]">
        <div className="container -my-[32px] mx-auto max-w-5xl">
          {/* title for section */}
          <h2 className="w-full text-center text-5xl font-bold leading-tight text-gray-800">
            Our Mission
          </h2>
          {/* image on left side of column */}
          <div className="flex flex-col-reverse flex-wrap sm:flex-row">
            <div className="w-full p-4 sm:w-1/2">
              <img
                className="min-h-0 w-full"
                src="https://i.imgur.com/V04n91S.png"
              />
            </div>
            {/* description for mission on right side of column */}
            <div className="mt-6 w-full p-6 sm:w-1/2">
              <div className="align-middle">
                <h3 className="mb-3 text-3xl font-bold leading-none text-gray-800">
                  Lorem ipsum dolor sit amet
                </h3>
                <p className="mb-8 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at ipsum eu nunc commodo posuere et sit amet ligula.
                  <br />
                  {/* link for the image source */}
                  <a
                    className="text-xs text-[#a8cd87]"
                    href="https://www.vectorstock.com/royalty-free-vector/flat-hands-typing-on-white-keyboard-with-cable-vector-15384106"
                  >
                    img source
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* mission statement ends */}

      {/* roles begins */}
      <section className="border-b bg-white py-2">
        <div className="container mx-auto flex flex-wrap pb-12 pt-4">
          {/* section title */}
          <h2 className="my-2 w-full text-center text-5xl font-bold leading-tight">
            Roles
          </h2>
          {/* first role */}
          <div className="flex w-full flex-shrink flex-grow flex-col p-10 md:w-1/3">
            <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-[#ffe08d] shadow">
              <div className="mt-5 w-full px-6 py-2 text-center text-xl font-bold">
                Teacher
                <br></br>
                <a
                  className="text-xs text-[#a8cd87]"
                  href="https://www.vectorstock.com/royalty-free-vector/female-teacher-in-classroom-school-and-learning-vector-38666684"
                >
                  img source
                </a>
              </div>
              <img
                className="w-full border"
                src="https://i.imgur.com/Ai2Vfhc.jpg"
              />
            </div>
          </div>
          {/* second role */}
          <div className="flex w-full flex-shrink flex-grow flex-col p-10 md:w-1/3">
            <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-[#ffe08d] shadow">
              <div className="mt-5 w-full px-6 py-2 text-center text-xl font-bold">
                Parent
                <br></br>
                <a
                  className="text-xs text-[#a8cd87]"
                  href="https://www.vectorstock.com/royalty-free-vector/family-parents-son-vector-36474395"
                >
                  img source
                </a>
              </div>
              <img
                className="w-full border"
                src="https://i.imgur.com/PBc2ZxY.jpg"
              />
            </div>
          </div>
          {/* third role */}
          <div className="flex w-full flex-shrink flex-grow flex-col p-10 md:w-1/3">
            <div className="flex-1 overflow-hidden rounded-b-none rounded-t bg-[#ffe08d] shadow">
              <div className="mt-5 w-full px-6 py-2 text-center text-xl font-bold">
                Student
                <br></br>
                <a
                  className="text-xs text-[#a8cd87]"
                  href="https://www.vectorstock.com/royalty-free-vector/children-learn-computer-or-laptop-vector-21390195"
                >
                  img source
                </a>
              </div>
              <img
                className="w-full border"
                src="https://i.imgur.com/ydIJSTW.jpg"
              />
            </div>
          </div>
        </div>
      </section>
      {/* roles ends */}

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
