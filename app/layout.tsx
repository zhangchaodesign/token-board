import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Roboto_Condensed } from "next/font/google";
import "./globals.css";

const roboto_condensed = Roboto_Condensed({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TokenBoard",
  description: "A dashboard for token data",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={
          roboto_condensed.className + " bg-gray-50 text-gray-800 flex flex-col"
        }
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
