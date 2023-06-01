import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { authOptions } from './api/auth/[...nextauth]/route';


export default async function Home() {
  const session = await getServerSession(authOptions)
  console.log(session);
  
  return (
    <section>
      <h1>Home</h1>
      <h1>Server Side Rendered</h1>
      <pre>{JSON.stringify(session)}</pre>
    </section>
  )
}
