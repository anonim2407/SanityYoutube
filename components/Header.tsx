import Link from "next/link";
import Image from "next/image";

function Header() {
  return (
    <header className="flex justify-between p-5 container max-w-7xl ">
      <div className="flex items-center ">
        <div>
          <Link href={"/"}>
            <Image
              className=" w-40 object-contain cursor-pointer"
              src={"/img/logo.png"}
              alt="Logo"
              width={1000}
              height={1000}

            />
          </Link>
        </div>
        <div className="hidden md:inline-flex items-center space-x-5 ">
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className="text-white bg-green-600 px-4 py-1 rounded-full ">
            Follow
          </h3>
        </div>
      </div>
      <div className="flex items-center space-x-5 text-green-600">
        <h3>Sing in</h3>
        <h3 className="border px-4 py-1 rounded-full border-green-600">Get Started</h3>
      </div>
    </header>
  );
}

export default Header;
