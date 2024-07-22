import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-col gap-6 my-[3rem]">
      <div>
        <div>
          <h1 className=" font-bold text-[1.875rem] md:text-[3.75rem]">
            Compare Anything, Anytime
          </h1>
          <p className="md:text-[1.5rem] text-[#5e6d82]">
            Our powerful comparison tool helps you make informed decisions by
            eeasily comparing products, services and more.
          </p>
        </div>
        <div className="flex flex-col gap-[1rem]">
          <Link
            className="bg-blue-500 text-white rounded-[0.5rem] text-[0.875rem] md:px-[2rem] py-[0.5rem] flex justify-center"
            href={"/compare"}
          >
            Start Comparing
          </Link>
          <Link
            className="bg-white border border-[1px] border-[#E2E8F0] rounded-[0.5rem] text-[0.875rem] md:px-[2rem] py-[0.5rem] flex justify-center"
            href={"/compare"}
          >
            Learn More
          </Link>
        </div>
      </div>

      <img
        src="https://thumbs.dreamstime.com/b/temporary-rubber-stamp-over-white-background-86664158.jpg"
        alt="temp"
      />
    </section>
  );
};

export default Hero;
