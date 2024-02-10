import { SESSION_STORAGE_KEY, baseUrl } from "@/config";
import { authService } from "@/services";
import { UserType } from "@/types/shared";
import NextAuth, { User } from "next-auth";
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
            email: data.email,
            image: data?.imagePath,
            id: data.customerId,
            name: `${data.firstName} ${data.lastName}`,
          };
          return user;
        } catch (err: unknown) {
          throw new Error(err as string);
        }
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      console.log({ token, session });
      // if (session.user) {
      //   session.user.id = token?.sub;
      // }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
