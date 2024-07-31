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
  description:
    "This is a solution to the Link-sharing app challenge on Frontend Mentor. It's a platform where users can share interesting links with each other.",
  openGraph: {
    title: "Frontend Mentor | Link-sharing app",
    description:
      "This is a solution to the Link-sharing app challenge on Frontend Mentor. It's a platform where users can share interesting links with each other.",
    type: "website",
    url: "https://www.frontendmentor.io/challenges/linksharing-app-Fbt7yweGsT",
    images: [
      "https://raw.githubusercontent.com/Chious/link-sharing-app-v2/main/app/icon.png",
    ],
  },
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
