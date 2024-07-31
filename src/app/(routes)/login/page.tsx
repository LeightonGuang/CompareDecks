import Image from "next/image";
import googleIcon from "../../../_assets/icons/googleIcon.svg";
import githubIcon from "../../../_assets/icons/githubIcon.svg";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { supabase } from "@/config/supabase";
import { login } from "@/app/login/actions";

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

  return (
    <main
      className="flex justify-center items-center h-dynamic-vh overflow-y-auto"
      id="login-page"
    >
      <div className="p-[2rem]" id="login-container">
        <div className="py-[3rem] text-center max-w-[28rem]" id="login-card">
          <h1 className="font-[700] leading-[2.25rem] text-[1.875rem]">
            Welcome to Compare Decks
          </h1>
          <p className="text-[#5e6d82] leading-[1.5rem] mt-[0.5rem]">
            Compare products, services and more by comparing them side-by-side.
          </p>
          <div
            className="flex flex-col gap-[1rem] text-[#020817] text-[0.875rem] mt-[1.5rem]"
            id="sign-in-with-container"
          >
            <form className="w-full">
              <button className="flex justify-center items-center w-full gap-[0.5rem] py-[0.5rem] px-[1rem] border border-[#E2E8F0] rounded-[0.375rem]">
                <Image
                  src={googleIcon}
                  alt="google icon"
                  height={16}
                  width={16}
                />
                Sign in with Google
              </button>
            </form>

            <form className="w-full">
              <button className="flex justify-center items-center w-full gap-[0.5rem] py-[0.5rem] px-[1rem] border border-[#E2E8F0] rounded-[0.375rem]">
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

          <div className="border-b border-[#E2E8F0] my-[1rem]" />
          <form className="flex flex-col gap-[1rem] text-left">
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Email
              <input
                className="border border-[#E2E8F0] font-[0.875rem] py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.375rem]"
                placeholder="m@example.com"
                name="email"
                type="email"
              />
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Password
              <input
                className="border border-[#E2E8F0] font-[0.875rem] py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.375rem]"
                name="password"
                type="password"
              />
            </label>

            <button
              className="bg-blue text-[#f8f8fc] py-[0.5rem] px-[1rem] rounded-[0.375rem]"
              formAction={login}
              type="submit"
            >
              Log in
            </button>
          </form>
          <button className="text-[#020817] text-[0.875rem] mt-[1rem] underline">
            Forgot your password?
          </button>

          <p className="text-[0.875rem] mt-[1rem] text-[#5e6d82]">
            {`Don't have an account?`}{" "}
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
