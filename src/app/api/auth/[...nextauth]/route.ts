import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GitHubProvider from "next-auth/providers/github";

import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // Add more providers here if needed
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt", // Use database for sessions
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Ensure this secret is set
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id.toString();
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.sub) {
        // session.user.id = token.sub;
        await sendMail({
          subject: "Below are the credentials",
          text: "Hello from the Kushal' site",
          html: `<h1>Hii ${token.name}</h1>
          <br/>
          <p>These are the credentials</p>
          `,
        });
        
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
