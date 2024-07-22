import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-[100dvh]">
      <div className="flex justify-center mx-[1rem] mt-mobile-spacing xl:mx-desktop-spacing max-w[84.5rem]">
        <Hero />
      </div>
    </main>
  );
}
