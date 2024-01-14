import AuthSidebar from "@/components/auth/auth-sidebar";
import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="grid lg:grid-cols-8">
      <aside className="hidden lg:block lg:col-span-2">
        <AuthSidebar />
      </aside>
      <main className="lg:col-span-6">
        {children}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 px-1 -z-10">
          <Image
            src="/think-save-blue.png"
            alt="Think Save"
            width={200}
            height={200}
            className="w-full m-0 h-full"
          />
        </div>
      </main>
    </section>
  );
};

export default Layout;
