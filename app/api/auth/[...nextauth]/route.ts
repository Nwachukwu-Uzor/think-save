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
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.customerId = user.customerId;
        token.name = user.name;
      }
      if (trigger === "update") {
        token.customerId = session.customerId;
        token.name = session.name;
      }

      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          customerId: token.customerId,
          name: token.name,
          image: token.picture,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
