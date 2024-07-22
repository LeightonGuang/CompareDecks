import Image from "next/image";

const Header = () => {
  return (
    <div className=" bg-red-600">
      <div className="flex mx-mobile-spacing py-mobile-spacing justify-between items-center">
        <img
          className="h-mobile-spacing"
          src="https://thumbs.dreamstime.com/b/temporary-rubber-stamp-over-white-background-86664158.jpg"
          alt="logo"
        />
        <nav className="flex gap-mobile-spacing bg-red">
          <div>Home</div>
          <div>Setting</div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
