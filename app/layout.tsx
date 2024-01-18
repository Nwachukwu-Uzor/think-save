import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SidebarContextProvider } from "@/context/admin/sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Think Save",
  description: "Reshape your financial future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarContextProvider>{children}</SidebarContextProvider>
      </body>
    </html>
  );
}
