"use client";

import Hero from "@/components/Hero";
import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

export default function Home() {
  const { fetchUser } = useUser();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <main
      className="h-dynamic-vh w-full snap-y snap-mandatory flex-col overflow-y-auto scroll-smooth"
      id="home-page"
    >
      <section
        className="flex h-dynamic-vh w-full snap-start items-center justify-center"
        id="hero-section"
      >
        <div
          className="max-w[84.5rem] mx-[1rem] flex items-center justify-center xl:mx-desktop-spacing"
          id="hero-container"
        >
          <Hero />
        </div>
      </section>
      <section
        className="flex h-dynamic-vh w-full snap-start items-center justify-center"
        id="feature-section"
      >
        <div id="feature-container">
          <h1>Features</h1>
        </div>
      </section>
    </main>
  );
}
