import Image from "next/image";
import googleIcon from "../../../_assets/icons/googleIcon.svg";
import githubIcon from "../../../_assets/icons/githubIcon.svg";

const Login = () => {
  return (
    <main
      className="flex justify-center items-center h-dynamic-vh"
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
            <button className="flex justify-center items-center gap-[0.5rem] py-[0.5rem] px-[1rem] border border-[#E2E8F0] rounded-[0.375rem]">
              <Image
                src={googleIcon}
                alt="google icon"
                height={16}
                width={16}
              />
              Sign in with Google
            </button>

            <button className="flex justify-center items-center gap-[0.5rem] py-[0.5rem] px-[1rem] border border-[#E2E8F0] rounded-[0.375rem]">
              <Image
                src={githubIcon}
                alt="github icon"
                height={16}
                width={16}
              />
              Sign in with GitHub
            </button>
          </div>

          <div className="border-b border-[#E2E8F0] my-[1rem]" />
          <form className="flex flex-col gap-[1rem] text-left">
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Email
              <input
                className="border border-[#E2E8F0] font-[0.875rem] py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.375rem]"
                placeholder="m@example.com"
                type="text"
              />
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Password
              <input
                className="border border-[#E2E8F0] font-[0.875rem] py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.375rem]"
                type="password"
              />
            </label>

            <button
              className="bg-blue text-[#f8f8fc] py-[0.5rem] px-[1rem] rounded-[0.375rem]"
              type="submit"
            >
              Sign in
            </button>
          </form>
          <button className="text-[#020817] text-[0.875rem] mt-[1rem] underline">
            Forgot your password?
          </button>

          <p className="text-[0.875rem] mt-[1rem] text-[#5e6d82]">
            {`Don't have an account?`}{" "}
            <button className="underline">Sign up</button>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
