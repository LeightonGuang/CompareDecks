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
  updateUsername: (username: string) => Promise<any>;
  updatePassword: (
    currentPassword: string,
    newPassword: string,
  ) => Promise<any>;
  deleteAccount: (userId: string) => Promise<any>;
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
        setUser(data.user);
        setIsUserFetched(false);
      } else {
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
        const errors = await response.json();

        // console.table(errors);

        if (response.ok) {
          console.log("Sign up successful");
          return { success: true, errors };
        } else {
          return { success: false, errors };
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

    updateUsername: async (newUsername: string) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,
            newUsername,
          }),
        };

        const response = await fetch("/api/updateUsername", options);
        const responseData = await response.json();
        if (response.ok) {
          console.log(responseData.message);
          return { success: true };
        } else {
          console.error(responseData.message.error);
          return responseData.message.error;
        }
      } catch (error) {
        console.error(error);
      }
    },

    updatePassword: async (
      currentPassword: string,
      newPassword: string,
    ): Promise<{ success: boolean; error: any }> => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            currentPassword,
            newPassword,
          }),
        };

        const response = await fetch("/api/updatePassword", options);
        const responseData = await response.json();
        if (response.ok) {
          return { success: true, error: null };
        } else {
          return { success: false, error: responseData.error };
        }
      } catch (error) {
        return { success: false, error };
      }
    },

    deleteAccount: async (userId: string) => {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
          }),
        };

        const response = await fetch("/api/deleteAccount", options);
        const responseData = await response.json();
        if (response.ok) {
          console.log(responseData.message);
          return { success: true };
        } else {
          console.error(responseData.message.error);
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
