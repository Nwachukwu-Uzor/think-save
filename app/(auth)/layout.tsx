import React from "react";
import { AuthSidebar } from "@/components/auth/";
import Image from "next/image";
import { AutoLogoutProvider } from "@/components/Layout/auto-logout-provider";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid lg:grid-cols-8 items-stretch">
      <aside className="hidden lg:block lg:col-span-2 h-full">
        <AuthSidebar />
      </aside>
      <main className="lg:col-span-6 min-h-screen">
        <section className="bg-white relative">{children}</section>
        <div className="lg:hidden fixed bottom-0 left-0 right-0 px-1.5">
          <Image
            src="/assets/images/think-save-blue.png"
            alt="Think Save"
            width={200}
            height={200}
            className="absolute left-0 right-0 bottom-0"
          />
        </div>
      </main>
    </section>
  );
};

export default AuthLayout;
