import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    customerId: string;
  }

  interface Session extends DefaultSession {
    user: User;
  }
}

// nextauth.d.ts
declare module "next-auth/jwt" {
  interface JWT {
    customerId: string;
    id: string;
  }
}
