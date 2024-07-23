import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className=" bg-red-600">
      <div className="flex mx-mobile-spacing xl:mx-[1.5rem] py-mobile-spacing justify-between items-center">
        <Link href={"/"}>
          <img
            className="h-mobile-spacing"
            src="https://thumbs.dreamstime.com/b/temporary-rubber-stamp-over-white-background-86664158.jpg"
            alt="logo"
          />
        </Link>
        <nav className="flex gap-[1.5rem] bg-red font-[.875rem] font-medium">
          <Link href={"/"}>Home</Link>
          <Link href={"/setting"}>Setting</Link>
        </nav>
      </div>
    </div>
  );
};

export default Header;
