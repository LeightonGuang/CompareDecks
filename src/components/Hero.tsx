import Image from "next/image";
import Link from "next/link";

import comparedecksPageImg from "../_assets/images/comparedecksPage.png";

const Hero = () => {
  return (
    <section className="flex max-w-[84.5rem] flex-col gap-[1.5rem] xl:flex-row xl:items-center xl:justify-between xl:gap-[3rem]">
      <div className="md:w-[37.5rem] xl:max-w-[704px]" id="description">
        <div>
          <h1 className="text-[1.875rem] font-bold leading-[1.875rem] md:text-[3rem] md:leading-[3rem] xl:text-[3.75rem] xl:leading-[3.75rem]">
            Compare Anything, Anytime
          </h1>
          <p className="mt-[0.5rem] text-[#5e6d82] md:max-w-[37.5rem] md:text-[1rem]">
            Our powerful comparison tool helps you make informed decisions by
            eeasily comparing products, services and more.
          </p>
        </div>
        <div className="mt-[1rem] flex flex-col gap-[1rem] md:flex-row">
          <Link
            className="flex h-[2.5rem] justify-center whitespace-nowrap rounded-[0.5rem] bg-[#2563eb] py-[0.5rem] text-[0.875rem] text-white md:w-[min-content] md:px-[2rem]"
            href={"/create-deck"}
          >
            Start Comparing
          </Link>
          <Link
            className="flex h-[2.5rem] justify-center whitespace-nowrap rounded-[0.5rem] border-[1px] border-[#E2E8F0] bg-white py-[0.5rem] text-[0.875rem] md:w-[min-content] md:px-[2rem]"
            href={"/example"}
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="flex items-center xl:h-[37.5rem] xl:w-[37.5rem]">
        <Image
          className="xl:max-h-[37.5rem] xl:w-[37.5rem] xl:object-contain"
          src={comparedecksPageImg}
          alt="Compare Decks Page"
        />
      </div>
    </section>
  );
};

export default Hero;
