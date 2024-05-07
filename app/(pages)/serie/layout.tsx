import { Metadata } from "next";






export const metadata: Metadata = {
    title: "CineStream: Buscar Series",
    description: "Buscar series de TV"
};



export default function LayoutSerie({ children } : { children: React.ReactNode}) {
    return (
        <>
            {children}
        </>
    )
}