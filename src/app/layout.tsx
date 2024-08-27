import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { UserProvider } from "@/context/UserContext";
import { DeckProvider } from "@/context/DeckContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Compare Deck",
  description:
    "Compare Deck simplifies the process of comparing different things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
          <DeckProvider>
            <Header />
            {children}
          </DeckProvider>
        </UserProvider>
      </body>
    </html>
  );
}
