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
      <section className="-mb-[96px] border-b bg-[#ffecde] lg:-mt-5">
        <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* left column for text */}
              <div className="mt-12 lg:mt-[105px]">
                <h1 className="text-5xl font-bold tracking-tight md:text-5xl lg:mb-16 lg:ml-[80px] lg:text-5xl">
                  Technology education <br />
                  <span className="text-primary">for grades k-2</span>
                  <p className="mt-5 text-2xl font-medium lg:mb-8">
                    Join us today to gain exclusive access to educational
                    material for your student or child
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
      <section className="relative mt-[97px] border-b bg-[#e5f2fe] pt-[60px]">
        <div className="container -my-[25px] mx-auto max-w-5xl">
          {/* title for section */}
          <h2 className="w-full text-center text-5xl font-bold leading-tight text-gray-800">
            Our Goal
          </h2>
          {/* image on left side of column */}
          <div className="flex flex-col-reverse flex-wrap sm:flex-row">
            <div className="w-full p-6 sm:w-1/2">
              <img
                className="min-h-0 w-full"
                src="https://i.imgur.com/giIQWTi.jpg"
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
                    className="text-xs text-[#a8cd87] underline"
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
    </main>
  );
}
