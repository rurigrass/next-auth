"use client";
import { useSession } from "next-auth/react";

const User = () => {
  const { data: session } = useSession();
  console.log(session);

  return <div>{JSON.stringify(session)}</div>;
};

export default User;
