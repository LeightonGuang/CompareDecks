"use client";

import getUser from "@/utils/getUser";
import React, { useEffect, useState } from "react";

const AccountPage = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUser();
      setUser(user);
      console.log(user);
    };
    fetchUser();
  }, []);

  return (
    <main className="h-dynamic-vh" id="create-deck-page">
      <div className="mx-mobile-spacing">
        <h1 className="pt-mobile-spacing">Account</h1>
        <div id="account-card">
          <label>
            email:
            <p>{user?.email}</p>
          </label>
          <label>
            id
            <p>{user?.id}</p>
          </label>
        </div>
      </div>
    </main>
  );
};

export default AccountPage;
