import { signup } from "@/app/signup/actions";

const SignupPage = async () => {
  return (
    <main className="flex justify-center items-center h-dynamic-vh overflow-y-auto">
      <div className="p-[2rem]" id="sign-up-container">
        <div className="py-[3rem] text-center max-w-[28rem]" id="sign-up-card">
          <h1 className="font-[700] leading-[2.25rem] text-[1.875rem]">
            Sign up
          </h1>
          <p className="text-[#5e6d82] leading-[1.5rem] mt-[0.5rem]">
            Compare products, services and more by comparing them side-by-side.
          </p>
          <form className="flex flex-col gap-[1rem] text-left">
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Username
              <input
                className="border border-[#E2E8F0] font-[0.875rem] py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.375rem]"
                placeholder="John Smith"
                name="displayName"
                type="text"
              />
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Email
              <input
                className="border border-[#E2E8F0] font-[0.875rem] py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.375rem]"
                placeholder="m@example.com"
                name="email"
                type="text"
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
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Confirm Password
              <input
                className="border border-[#E2E8F0] font-[0.875rem] py-[0.5rem] px-[0.75rem] mt-[0.5rem] rounded-[0.375rem]"
                name="confirmPassword"
                type="password"
              />
            </label>

            <button
              className="bg-blue text-[#f8f8fc] py-[0.5rem] px-[1rem] rounded-[0.375rem]"
              formAction={signup}
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
