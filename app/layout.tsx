import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/provider";
import GQLProvider from "@/contexts/gqlProvider";

const instrumentSans = Inter({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
});

export const metadata: Metadata = {
  title: "Frontend Mentor | Link-sharing app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${instrumentSans.variable} font-sans bg-light-gray w-screen h-screen`}
      >
        <main className=" p-0 md:p-8 lg:p-8 h-screen">
          <GQLProvider>
            <UserProvider>{children}</UserProvider>
          </GQLProvider>
        </main>
      </body>
    </html>
  );
}
