import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Syntax Error",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="luxury" lang="en">
      <body>
        <main className="w-full flex flex-col flex-grow justify-between">
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
