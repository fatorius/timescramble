import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TimeScramble",
  description: "How many winning positions can you convert in a timescramble?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-US">
      <body
        className={`antialiased w-full flex flex-col gap-8 justify-center bg-[#dfd8cc] h-screen text-center items-center`}
      >
        {children}
      </body>
    </html>
  );
}
