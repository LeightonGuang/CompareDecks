"use client";

import { createClient } from "@/utils/supabase/client";
import { clear } from "console";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  user: any;
  isLoading: boolean;
  setUser: (user: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  fetchUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchUserData = async () => {
    console.log("Fetching user...");
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();

    if (!data?.user) {
      console.log("No user found");
      setUser(null);
    } else if (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } else {
      console.log("User found");
      setUser(data.user);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoading, setUser, setIsLoading, fetchUserData }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
