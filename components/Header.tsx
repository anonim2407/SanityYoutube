import Link from "next/link";
import { useEffect, useState } from "react";

function Header() {
  const [openManu, setOpenMenu] = useState(false);

  return (
    <header className="z-10 fixed top-0 left-0 right-0">
      <div className=" p-5 bg-[#ffffff63] backdrop-blur-[5px]">
        <div className="flex justify-between text-black container max-w-7xl mx-auto">
          <div>
            <Link href={"/"}>
              <div>
                <p className=" text-green-300 text-3xl font-extrabold">
                  BuscaTu<span className=" text-black">AI</span>
                </p>
              </div>
            </Link>
          </div>

          <nav className="hidden md:inline-flex items-center space-x-7 font-semibold">
            <Link
              className=" transition duration-300 hover:text-green-300"
              href={"/"}
            >
              Home
            </Link>

            <Link
              className=" transition duration-300 hover:text-green-300"
              href={"/"}
            >
              Categorias
            </Link>
            <Link
              className=" transition duration-300 hover:text-green-300"
              href={"/"}
            >
              Blog
            </Link>
          </nav>
          <div
            className="flex justify-center items-center md:hidden "
            onClick={() => setOpenMenu(!openManu)}
          >
            {!openManu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      <nav
        className={`absolute top-24 w-full md:hidden font-semibold transition duration-300 ${
          openManu ? " opacity-100 " : " opacity-0"
        }`}
      >
        <div className=" flex flex-col justify-center items-center space-y-5 mx-2 p-4 rounded-xl bg-[#ffffff63] backdrop-blur-[5px]">
          <Link
            className=" transition duration-300 hover:text-green-300"
            href={"/"}
          >
            Home
          </Link>
          <Link
            className=" transition duration-300 hover:text-green-300"
            href={"/"}
          >
            Directorio
          </Link>
          <Link
            className=" transition duration-300 hover:text-green-300"
            href={"/"}
          >
            Categorias
          </Link>
          <Link
            className=" transition duration-300 hover:text-green-300"
            href={"/"}
          >
            Blog
          </Link>
        </div>
      </nav>
    </header>  
    
  );
}

export default Header;
