import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cine Stream",
  description: "Site Guia de Filmes e Series de TV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <header className="header">
            <Link href={"/"} className="title-container">
              <h1>Cine</h1>
              <h1>Stream</h1>
            </Link>
            <nav className="nav-container">
              <Link href="/">HOME</Link>
              <Link href="/">FILMES</Link>
              <Link href="/">SERIES/TV</Link>
              <Link href="/">SOBRE</Link>
            </nav>
        </header>
        {children}
        
        </body>
    </html>
  );
}
