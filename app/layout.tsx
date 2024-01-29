"use client";
import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outfit } from "next/font/google";
import "./globals.css";
import { SidebarContextProvider } from "@/context/admin/sidebar";

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
