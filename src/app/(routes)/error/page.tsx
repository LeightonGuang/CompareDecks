"use client";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  return (
    <main className="flex h-dynamic-vh items-center justify-center">
      <div className="mx-[1rem] text-center">
        <h1 className="text-[36px] font-[700]">Oops, something went wrong!</h1>
        <p className="mt-[1rem] text-[#5E6D82]">
          We're sorry, but an unexpected error has occurred. Please try again
          later or contact support if the issue persists.
        </p>
        <button
          className="mt-[1.5rem] rounded-[0.325rem] bg-blue px-[1rem] py-[0.5rem] text-[0.875rem] text-white"
          onClick={() => router.push("/")}
        >
          Go to Homepage
        </button>
      </div>
    </main>
  );
}
