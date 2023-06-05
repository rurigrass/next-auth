import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "./components/User";
import Link from "next/link";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <section>
      <br />
      <h1 className="text-xl underline">Server Side Rendered</h1>
      <pre>{JSON.stringify(session)}</pre>
      <br />
      <h1 className="text-xl underline">Client Side Rendered</h1>
      <User />
    </section>
  );
}
