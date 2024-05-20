import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Metadata } from "next";
import SearchMovies from "./(pages)/search/search-movies";
import { LuPlay } from "react-icons/lu";

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
              <h1><LuPlay/>Cine</h1>
              <h1>Stream</h1>
            </Link>
            <SearchMovies/>
            <nav className="nav-container">
              <Link href="/">HOME</Link>
              <Link href="/filmes/generos?genre=Action&id=28&page=1">FILMES</Link>
              <Link href="/series/generos?genre=Action-&-Adventure&id=10759&page=1">SERIES/TV</Link>
              <Link href="/sobre">SOBRE</Link>
            </nav>
        </header>
           {children}
           <div className="informations-site">
            <h3>Filmes Online - Assistir Filmes Online - Filmes Online Grátis - Filmes Completos Dublados</h3>
            <p>A CineStreamHd é uma plataforma de site e aplicativo para assistir filmes e séries online grátis! Nosso site atualiza 
              todas as séries diariamente em versões legendadas e dubladas, e como somos um indexador automático, somos os mais rápidos a 
              postar no Brasil. A CineStreamHd não armazena mega filmes e séries em nosso site, garantindo que estamos completamente dentro da lei.
               A CineStreamHd indexa conteúdo encontrado na web automaticamente usando robôs e inteligência artificial. O uso da CineStreamHd é 
               totalmente responsabilidade do usuário. A distribuição de filmes é realizada por plataformas como mystream, fembed, entre outras. 
               Qualquer violação de direitos autorais deve ser reportada diretamente ao distribuidor. Em caso 
              de dúvidas ou reclamações sobre conteúdo, funcionalidade do site, anúncios, entre outros, entre em contato com nossa equipe de suporte.</p>
           </div>
           <footer className="footer-container">
              <p><strong>AVISO LEGAL:</strong> Nós não armazenamos nenhum dos arquivos em nenhum servidor. Todos os conteúdos são fornecidos por terceiros sem qualquer tipo de filiação</p>
              <div className="copyright">
                <h5>CINESTREAM</h5>
                <p>©CineStream 2024 - TODOS OS DIREITOS DO CÓDIGO DO SITE RESERVADOS.</p>
              </div>
           </footer>
        </body>
    </html>
  );
}
