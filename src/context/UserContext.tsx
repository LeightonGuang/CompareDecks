"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState } from "react";

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  isUserFetched: boolean;
  setIsUserFetched: (isLoading: boolean) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
  fetchUser: () => Promise<void>;
  signUpWithEmail: (
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<any>;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  passwordChange: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<any>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isUserFetched, setIsUserFetched] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  const value: any = {
    user,
    setUser,
    isUserFetched,
    errorMessage,
    setErrorMessage,

    fetchUser: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        console.log("user", data.user);
        setUser(data.user);
        setIsUserFetched(false);
      } else {
        console.log("no user");
        setUser(undefined);
        setIsUserFetched(false);
      }
    },

    signUpWithEmail: async (
      username: string,
      email: string,
      password: string,
      confirmPassword: string,
    ) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
            confirmPassword,
          }),
        };

        const response = await fetch("/api/signup", options);

        if (response.ok) {
          console.log("Sign up successful");
          router.push("/");
        } else {
          const errorData = await response.json();
          const errors = errorData.errors;
          return errors;
        }
      } catch (error) {
        console.error("error: " + error);
        router.push("/error");
      }
    },

    signInWithGoogle: async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: "google",
          options: {
            redirectTo: window.location.origin,
          },
        });
        console.log(data);
        if (error) {
          console.error("Google login error: ", error);
        }
      } catch (error) {
        console.error("Error during Google login: ", error);
      }
    },

    signInWithEmail: async (email: string, password: string) => {
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
        const responseData = await response.json();

        if (response.ok) {
          router.push("/");
        } else {
          console.error(responseData.message.error);
          setErrorMessage(responseData.message.error);
        }
        return response;
      } catch (error) {
        console.error("Error during email login: ", error);
      }
    },

    signOut: async () => {
      try {
        // Trigger the server-side logout function through the API route
        const response = await fetch("/api/logout", { method: "POST" });

        if (response.ok) {
          // Update the client-side user state to null
          setUser(null);
          // Redirect the user to the homepage after logout
          router.push("/");
        } else {
          console.error("Failed to logout");
          router.push("/error");
        }
      } catch (error) {
        console.error("An error occurred while logging out:", error);
      }
    },

    passwordChange: async (currentPassword: string, newPassword: string) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        };

        const response = await fetch("/api/passwordChange", options);
        const responseData = await response.json();
        if (response.ok) {
          console.log(responseData.message);
        } else {
          console.error(responseData.message.error);
          setErrorMessage(responseData.message.error);
        }
      } catch (error) {
        console.error(error);
      }
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
