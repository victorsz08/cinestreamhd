'use client'

import MoviesGenres from "@/app/components/Genres/MoviesGenres";
import { useSearchParams } from "next/navigation"
import style from "./genres.module.css";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/app/loading";
import { IGenres } from "@/app/types";
import { optionsApi } from "@/app/services/optionsApi";
import MoviesPage from "./movies_page";
import MovieGenres from "./movies_genres";



export default function Genres() {
    const searchParams = useSearchParams();
    const genre = searchParams.get('genre') || '';
    const id = searchParams.get('id') || '';
    const page = searchParams.get('page') || '1';

    const [totalPages, setTotalPages] = useState(0);
    const [genres, setGenres] = useState<IGenres[]>([])

    useEffect(() => {
        getGenres();
        getTotalPages();
    },[genre, id]);


    const getGenres = async () => {
        const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=pt-BR", optionsApi)
                                .then(res => res.json());
        
        setGenres(response.genres);
    }

    const getTotalPages = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${id}&language=pt-BR`, optionsApi)
                                .then(res => res.json());
        
        setTotalPages(response.total_pages);
    }


    return (
        <section className={style.movies_genres_container}>
            <MovieGenres genres={genres} genre_id={id}/>
            <Suspense fallback={<Loading/>}>
                <MoviesGenres genre_id={id} page={parseInt(page)}/>
            </Suspense>
            <MoviesPage genre_id={id} genre_name={genre} page={parseInt(page)} totalPages={totalPages}/>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3068788226321043"
          crossOrigin="anonymous"></script>
        </section>
    )
}