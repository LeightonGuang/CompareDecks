"use client";

import { useRouter } from "next/navigation";
import { useRef } from "react";

const SignupPage = () => {
  const signUpForm = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleSignUp = async () => {
    const formData = new FormData(signUpForm.current!);
    const displayName = formData.get("displayName");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          displayName,
          email,
          password,
        }),
      };

      const response = await fetch("/api/signup", options);
      console.log(response);

      if (response.ok) {
        console.log("Sign up successful");
        router.push("/");
      } else {
        console.error("Failed to sign up");
        router.push("/error");
      }
    } catch (error) {
      console.error("error: " + error);
      router.push("/error");
    }
  };

  return (
    <main className="flex h-dynamic-vh items-center justify-center overflow-y-auto">
      <div className="p-[2rem]" id="sign-up-container">
        <div className="max-w-[28rem] py-[3rem] text-center" id="sign-up-card">
          <h1 className="text-[1.875rem] font-[700] leading-[2.25rem]">
            Sign up
          </h1>
          <p className="mt-[0.5rem] leading-[1.5rem] text-[#5e6d82]">
            Compare products, services and more by comparing them side-by-side.
          </p>
          <form className="flex flex-col gap-[1rem] text-left" ref={signUpForm}>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Username
              <input
                className="mt-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[0.75rem] py-[0.5rem] font-[0.875rem]"
                placeholder="John Smith"
                name="displayName"
                type="text"
              />
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Email
              <input
                className="mt-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[0.75rem] py-[0.5rem] font-[0.875rem]"
                placeholder="m@example.com"
                name="email"
                type="email"
              />
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Password
              <input
                className="mt-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[0.75rem] py-[0.5rem] font-[0.875rem]"
                name="password"
                type="password"
              />
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Confirm Password
              <input
                className="mt-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[0.75rem] py-[0.5rem] font-[0.875rem]"
                name="confirmPassword"
                type="password"
              />
            </label>

            <button
              className="rounded-[0.375rem] bg-blue px-[1rem] py-[0.5rem] text-[#f8f8fc]"
              formAction={handleSignUp}
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
export default SignupPage;
