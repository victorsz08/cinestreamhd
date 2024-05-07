import { Metadata } from "next";




export const metadata: Metadata = {
    title: "CineStrean: Buscar Filmes",
    description: "Buscar Filmes Online"
}

export default function LayoutMovie({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    );
}