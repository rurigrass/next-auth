import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import User from "./components/User";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <section>
      <h1 className="text-2xl">Home</h1>
      <br />
      <h1 className="text-xl underline">Server Side Rendered</h1>
      <pre>{JSON.stringify(session)}</pre>
      <br />
      <h1 className="text-xl underline">Client Side Rendered</h1>
      <User />
    </section>
  );
}
