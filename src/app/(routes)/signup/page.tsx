"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SignupFormProps } from "@/_types/SignupFormProps";
import { useUser } from "@/context/UserContext";

interface ErrorProps {
  hasEmptyUsernameError: boolean;
  hasEmptyEmailError: boolean;
  hasEmptyPasswordError: boolean;
  hasWhiteSpaceError: boolean;
  hasAlphaNumericError: boolean;
  isPasswordLengthError: boolean;
  hasEmptyConfirmPasswordError: boolean;
  isPasswordMatchError: boolean;
}

const SignupPage = () => {
  const { signUpWithEmail, fetchUser } = useUser();
  const [formState, setFormState] = useState<SignupFormProps>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<ErrorProps>({
    hasEmptyUsernameError: false,
    hasEmptyEmailError: false,
    hasEmptyPasswordError: false,
    hasWhiteSpaceError: false,
    hasAlphaNumericError: false,
    isPasswordLengthError: false,
    hasEmptyConfirmPasswordError: false,
    isPasswordMatchError: false,
  });

  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSignUp = async () => {
    try {
      const response = await signUpWithEmail(
        formState.username,
        formState.email,
        formState.password,
        formState.confirmPassword,
      );

      if (response.success) {
        router.push("/");
      } else if (!response.success) {
        setErrors(response.errors);
      }
    } catch (error) {
      console.error("error: " + error);
      router.push("/error");
    }
  };

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

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
          <form className="flex flex-col gap-[1rem] text-left">
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Username*
              <input
                className={`mt-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[0.75rem] py-[0.5rem] font-[0.875rem] ${errors.hasEmptyUsernameError && "border-red-500"}`}
                placeholder="John Smith"
                name="username"
                type="text"
                value={formState.username}
                onChange={handleFormChange}
              />
              {errors.hasEmptyUsernameError && (
                <p className="mt-[0.5rem] text-[0.75rem] text-red-500">
                  Please enter a username
                </p>
              )}
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Email*
              <input
                className={`mt-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[0.75rem] py-[0.5rem] font-[0.875rem] ${errors.hasEmptyEmailError && "border-red-500"}`}
                placeholder="m@example.com"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleFormChange}
              />
              {errors.hasEmptyEmailError && (
                <p className="mt-[0.5rem] text-[0.75rem] text-red-500">
                  Please enter an email
                </p>
              )}
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Password*
              <input
                className={`mt-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[0.75rem] py-[0.5rem] font-[0.875rem] ${(errors.hasEmptyPasswordError || errors.hasAlphaNumericError || errors.isPasswordLengthError) && "border-red-500"}`}
                name="password"
                type="password"
                value={formState.password}
                onChange={handleFormChange}
              />
              {errors.hasEmptyPasswordError ? (
                <p className="mt-[0.5rem] text-[0.75rem] text-red-500">
                  Please enter a password
                </p>
              ) : errors.hasWhiteSpaceError ? (
                <p className="mt-[0.5rem] text-[0.75rem] text-red-500">
                  Password must not contain white space
                </p>
              ) : errors.hasAlphaNumericError ? (
                <p className="mt-[0.5rem] text-[0.75rem] text-red-500">
                  Password must contain at least one letter and one number (eg.
                  abcd1234)
                </p>
              ) : (
                errors.isPasswordLengthError && (
                  <p className="mt-[0.5rem] text-[0.75rem] text-red-500">
                    Password must contain at least 8 characters
                  </p>
                )
              )}
            </label>
            <label className="flex flex-col text-[0.875rem] font-[500]">
              Confirm Password*
              <input
                className={`mt-[0.5rem] rounded-[0.375rem] border border-[#E2E8F0] px-[0.75rem] py-[0.5rem] font-[0.875rem] ${errors.hasEmptyConfirmPasswordError && "border-red-500"}`}
                name="confirmPassword"
                type="password"
                value={formState.confirmPassword}
                onChange={handleFormChange}
              />
              {errors.hasEmptyConfirmPasswordError ? (
                <p className="mt-[0.5rem] text-[0.75rem] text-red-500">
                  Please confirm your password
                </p>
              ) : (
                errors.isPasswordMatchError && (
                  <p className="mt-[0.5rem] text-[0.75rem] text-red-500">
                    Passwords do not match
                  </p>
                )
              )}
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
