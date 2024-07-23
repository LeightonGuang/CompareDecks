import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-col gap-[1.5rem] xl:flex-row xl:gap-[3rem] xl:justify-between xl:items-center max-w-[84.5rem]">
      <div className="md:w-[37.5rem] xl:max-w-[704px]" id="description">
        <div>
          <h1 className=" font-bold text-[1.875rem] md:text-[3rem] xl:text-[3.75rem] leading-[1.875rem] md:leading-[3rem] xl:leading-[3.75rem]">
            Compare Anything, Anytime
          </h1>
          <p className="text-[#5e6d82] mt-[0.5rem] md:text-[1rem] md:max-w-[37.5rem]">
            Our powerful comparison tool helps you make informed decisions by
            eeasily comparing products, services and more.
          </p>
        </div>
        <div className="flex flex-col gap-[1rem] md:flex-row mt-[1rem]">
          <Link
            className="flex justify-center rounded-[0.5rem] h-[2.5rem] md:w-[min-content] md:px-[2rem] text-[0.875rem] py-[0.5rem]  bg-[#2563eb] text-white whitespace-nowrap"
            href={"/create-deck"}
          >
            Start Comparing
          </Link>
          <Link
            className="flex justify-center rounded-[0.5rem] h-[2.5rem] md:w-[min-content] md:px-[2rem] text-[0.875rem] py-[0.5rem] bg-white border-[1px] border-[#E2E8F0] whitespace-nowrap"
            href={"/example"}
          >
            Learn More
          </Link>
        </div>
      </div>
      <div className="flex xl:h-[37.5rem] xl:w-[37.5rem] items-center">
        <img
          className="xl:max-h-[37.5rem] xl:w-[37.5rem] xl:object-contain"
          src="https://placehold.co/1920x1080"
          alt="temp"
        />
      </div>
    </section>
  );
};

export default Hero;
