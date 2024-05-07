import { Metadata } from "next";




const metadata: Metadata = {
    title: "CineStrean: Filmes",
    description: "Buscar Filmes Online"
}

export default function LayoutMovie({children} : { children: React.ReactNode}) {
    return (
        <html>
            {children}
        </html>
    )
}