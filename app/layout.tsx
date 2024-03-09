import type { Metadata } from "next";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outfit } from "next/font/google";
import "./globals.css";
import "./index.css"
import { SidebarContextProvider } from "@/context/admin/sidebar";
import { Provider, SessionProvider } from "@/components/shared";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Think Save",
  description: "Reshape your financial future",
  icons: "/assets/images/logo-favicon.svg",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Provider>
          <SessionProvider session={session}>
            <SidebarContextProvider>{children}</SidebarContextProvider>
            <ToastContainer />
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="bottom-left"
            />
          </SessionProvider>
        </Provider>
      </body>
    </html>
  );
}
