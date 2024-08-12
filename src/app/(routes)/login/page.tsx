"use client";

import Image from "next/image";
import googleIcon from "../../../_assets/icons/googleIcon.svg";
import githubIcon from "../../../_assets/icons/githubIcon.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { useUser } from "@/context/UserContext";

const LoginPage = () => {
  // const handleGoogleLogin = async (e: any) => {
  //   "use server";
  //   e.preventDefault();
  //   const origin = headers().get("origin");
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "google",
  //     options: { redirectTo: `${origin}` },
  //   });

  //   if (data) {
  //     console.log(data);
  //   }

  //   if (error) {
  //     console.error(error);
  //   } else {
  //     return redirect(data.url);
  //   }
  // };

  // const handleGithubLogin = async () => {
  //   "use server";
  //   const origin = headers().get("origin");
  //   const { data, error } = await supabase.auth.signInWithOAuth({
  //     provider: "github",
  //     options: { redirectTo: `${origin}` },
  //   });

  //   if (error) {
  //     console.error(error);
  //   } else {
  //     return redirect(data.url);
  //   }
  // };

  const { fetchUserData } = useUser();

  const emailLoginForm = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const handleLogin = async () => {
    const formData = new FormData(emailLoginForm.current!);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      };

      const response = await fetch("/api/login", options);
      console.log(response);

      if (response.ok) {
        fetchUserData();
        router.push("/");
      } else {
        console.error("Failed to login");
        router.push("/error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main
      className="flex h-dynamic-vh items-center justify-center overflow-y-auto"
      id="login-page"
    >
      <div className="p-[2rem]" id="login-container">
        <div className="max-w-[28rem] py-[3rem] text-center" id="login-card">
          <h1 className="text-[1.875rem] font-[700] leading-[2.25rem]">
            Welcome to Compare Decks
          </h1>
          <p className="mt-[0.5rem] leading-[1.5rem] text-[#5e6d82]">
            Compare products, services and more by comparing them side-by-side.
          </p>
          <div
            className="mt-[1.5rem] flex flex-col gap-[1rem] text-[0.875rem] text-[#020817]"
            id="sign-in-with-container"
          >
            <form className="w-full" id="google-login-form">
              <button className="flex w-full items-center justify-center gap-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[1rem] py-[0.5rem]">
                <Image
                  src={googleIcon}
                  alt="google icon"
                  height={16}
                  width={16}
                />
                Sign in with Google
              </button>
            </form>

            <form className="w-full" id="github-login-form">
              <button className="flex w-full items-center justify-center gap-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[1rem] py-[0.5rem]">
                <Image
                  src={githubIcon}
                  alt="github icon"
                  height={16}
                  width={16}
                />
                Sign in with GitHub
              </button>
            </form>
          </div>

          <div className="my-[1rem] border-b border-[#E2E8F0]" />
          <form
            className="flex flex-col gap-[1rem] text-left"
            id="email-login-form"
            ref={emailLoginForm}
          >
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

            <button
              className="rounded-[0.375rem] bg-blue px-[1rem] py-[0.5rem] text-[#f8f8fc]"
              formAction={handleLogin}
              type="submit"
            >
              Log in
            </button>
          </form>
          <button className="mt-[1rem] text-[0.875rem] text-[#020817] underline">
            Forgot your password?
          </button>

          <p className="mt-[1rem] text-[0.875rem] text-[#5e6d82]">
            {`Don't have an account?`}
            <Link className="underline" href={"/signup"}>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
