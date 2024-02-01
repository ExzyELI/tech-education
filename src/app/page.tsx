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
      <section className="-mb-[96px] bg-[#ffecde] lg:-mt-5">
        <div className="px-6 py-12 text-center md:px-12 lg:my-12 lg:text-left">
          <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              {/* left column for text */}
              <div className="mt-12 lg:mt-0">
                <h1 className="text-5xl font-bold tracking-tight md:text-5xl lg:mb-16 lg:ml-[80px] lg:text-5xl">
                  <p className="mb-2 text-2xl font-medium">Welcome</p>
                  Technology education <br />
                  <span className="text-primary">for grades k-2</span>
                  <p className="mt-5 text-2xl font-medium lg:mb-8">
                    Join us today to gain exclusive access to educational
                    material
                  </p>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* banner ends */}
    </main>
  );
}
