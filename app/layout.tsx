import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "CineStream"
}


export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {

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
              <Link href="/filme">FILMES</Link>
              <Link href="/serie">SERIES/TV</Link>
              <Link href="/sobre">SOBRE</Link>
            </nav>
        </header>
        <Suspense fallback={<Loading/>}>
           {children}
        </Suspense>
        </body>
    </html>
  );
}
