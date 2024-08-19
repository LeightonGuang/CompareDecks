"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: any;
  setUser: (user: any) => void;
  isLoading: boolean;
  fetchUser: () => Promise<void>;
  setIsLoading: (isLoading: boolean) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    console.log("user updated", user);
  }, [user]);

  const getUser = async () => {
    const superbase = createClient();
    const { data, error } = await superbase.auth.getUser();

    if (error || !data?.user) {
      return null;
    } else {
      return data.user;
    }
  };

  const value: any = {
    user,
    setUser,
    isLoading,

    fetchUser: async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.getUser();
      if (data.user) {
        console.log("user", data.user);
        setUser(data.user);
        setIsLoading(false);
      } else {
        console.log("no user");
        setUser(undefined);
        setIsLoading(false);
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

        if (response.ok) {
          router.push("/");
        } else {
          console.error("Failed to login");
          router.push("/error");
        }
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
