import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main id="home-page">
      <div
        className="flex justify-center items-center h-dynamic-vh w-[100dvw]"
        id="hero-section"
      >
        <div className="flex justify-center items-center mx-[1rem] xl:mx-desktop-spacing max-w[84.5rem]">
          <Hero />
        </div>

        <div></div>
      </div>
    </main>
  );
}
