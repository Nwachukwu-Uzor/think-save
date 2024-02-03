"use client";
import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarContextProvider } from "@/context/admin/sidebar";
import { useEffect } from "react";
import { SESSION_STORAGE_KEY } from "@/config";

const outfit = Outfit({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Think Save",
//   description: "Reshape your financial future",
//   icons: "/assets/images/logo-favicon.svg",
// };

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const user = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!user) {
      toast.error("Please login", { theme: "colored" });
      router.push("/login");
    }
  }, [router]);

  return (
    <html lang="en">
      <body className={outfit.className}>
        <QueryClientProvider client={queryClient}>
          <SidebarContextProvider>{children}</SidebarContextProvider>
          <ToastContainer />
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
      </body>
    </html>
  );
}
