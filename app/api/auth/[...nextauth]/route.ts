import NextAuth from "next-auth/next";
import { AuthOptions } from "next-auth";
import prisma from "../../../libs/prismadb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, name, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "email", type: "text", placeholder: "name@email.com" },
        password: { label: "password", type: "password" },
        // username: {
        //   label: "Username",
        //   type: "text",
        //   placeholder: "John Smith",
        // },
      },
      async authorize(credentials) {
        //check if email and password are there:
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        //check if the user actually exists
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        //if no user is found
        if (!user || !user?.hashedPassword) {
          throw new Error("No user found");
        }

        //check to see if password matches
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        //if passwords dont match
        if (!passwordMatch) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],
  // callbacks: {
  //   session: ({ session, token }) => {
  //     console.log('Session Callback', { session, token })
  //     return {
  //       ...session,
  //       user: {
  //         ...session.user,
  //         id: token.id,
  //         randomKey: token.randomKey
  //       }
  //     }
  //   },
  //   jwt: ({ token, user }) => {
  //     console.log('JWT Callback', { token, user })
  //     if (user) {
  //       const u = user as unknown as any
  //       return {
  //         ...token,
  //         id: u.id,
  //         randomKey: u.randomKey
  //       }
  //     }
  //     return token
  //   }
  // },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
