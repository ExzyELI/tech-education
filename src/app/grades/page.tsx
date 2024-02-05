export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#ffecde] text-[#132241]">
      {/*navbar begins */}
      <nav className="sticky w-full border-b border-gray-200 bg-[#afce8b]">
        <header className="font-family: font-serif leading-normal tracking-normal">
          <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              Tech Education
            </span>
            {/* tabs */}
            <div className="flex space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse">
              <nav className="text-2lg">
                <a
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
                >
                  Activities
                </a>
                <a
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
                >
                  Grade
                </a>
                <a
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
                >
                  Reports
                </a>
                <a
                  href="#"
                  className="cursor-pointer px-3 text-lg font-semibold hover:text-[#ffe08d]"
                >
                  Profile
                </a>
              </nav>
            </div>
          </div>
        </header>
      </nav>
      {/* navbar ends */}

      <section className="container mx-auto w-full py-5">
        <h1 className="items-center py-1 text-center text-5xl font-medium">
          Grades
        </h1>
        <h2 className="font-sm items-center text-center text-2xl text-[#ff6865]">
          Student name
        </h2>
        <div className="mx-auto mb-10 mt-5 flex w-5/6 items-center justify-center rounded border bg-white p-8 lg:w-2/3">
          <div className="gradient font-family: font-serif leading-normal tracking-normal">
            <h3 className="mb-3 ml-3 text-lg font-semibold">Activities</h3>
            <ul className="w-[250px] md:w-[350px] lg:w-[500px]">
              {/* array for activity colors for odds and evens */}
              {Array(10)
                .fill(true)
                .map((_, index) => {
                  if (index % 2 == 0) {
                    return (
                      <div
                        key={index}
                        className="m-2 rounded-md border bg-[#e1f3ff] p-2"
                      >
                        Activity {index + 1}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="m-2 rounded-md border bg-[#e8f8da] p-2"
                      >
                        Activity {index + 1}
                      </div>
                    );
                  }
                })}
            </ul>
          </div>

          <div className="gradient font-family: font-serif leading-normal tracking-normal text-[#132241]">
            <h3 className="mb-3 ml-3 text-left text-lg font-semibold">
              Grades
            </h3>
            <ul className="w-[90px]">
              {/* array for grades to have a different color for odds and evens */}
              {Array(10)
                .fill(true)
                .map((_, index) => {
                  if (index % 2 == 0) {
                    return (
                      <div
                        key={index}
                        className="m-2 rounded-md border bg-[#e1f3ff] p-2 text-center"
                      >
                        5/10
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={index}
                        className="m-2 rounded-md border bg-[#e8f8da] p-2 text-center"
                      >
                        10/10
                      </div>
                    );
                  }
                })}
            </ul>
          </div>
        </div>
      </section>

      {/* footer begins */}
      <footer className="sticky w-full bg-[#afce8b]">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-center px-4 py-4">
          <span className="text-sm sm:text-center ">
            © 2024 Tech Education™
          </span>
        </div>
      </footer>
      {/* footer ends */}
    </div>
  );
}
