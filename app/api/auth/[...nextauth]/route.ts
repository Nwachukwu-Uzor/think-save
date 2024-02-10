import { SESSION_STORAGE_KEY, baseUrl } from "@/config";
import { authService } from "@/services";
import { UserType } from "@/types/shared";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Custom Provider",
      id: "login",
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        try {
          const { username, password } = credentials;
          const response = await authService.login({ username, password });

          if (!response?.status) {
            throw new Error(response.message);
          }

          const { data } = response;

          if (!data) {
            return null;
          }
          const user = {
            ...data,
            email: data.email,
            image: data?.imagePath,
            id: data.customerId,
            name: `${data.firstName} ${data.lastName}`,
            customerId: data.customerId,
          };
          return user;
        } catch (err: unknown) {
          throw new Error(err as string);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger }) {
      /* Step 1: update the token based on the user object */
      if (trigger === "update") {
        console.log("triggered");
      }
      if (user) {
        token.customerId = user.customerId;
      }
      return { ...token, ...user };
    },
    async session({ session, token, trigger, newSession }) {
      session.user.id = token.id;
      session.user.customerId = token.customerId;
      if (trigger === "update") {
        console.log({ newSession });

        return {
          ...session,
          ...newSession,
        };
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
