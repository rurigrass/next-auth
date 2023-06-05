"use client";
import { signOut } from "next-auth/react";

const SignOut = () => {
  return (
    <button className="text-2xl" onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export default SignOut;
