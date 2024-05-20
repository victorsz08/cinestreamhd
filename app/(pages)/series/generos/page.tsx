'use client';

import { optionsApi } from "@/app/services/optionsApi";
import { IGenres } from "@/app/types";
import { redirect, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import style from "./genres_series.module.css";
import Loading from "@/app/loading";
import SeriesGenres from "@/app/components/Genres/SeriesGenres";
import GenrePages from "./series_pages";
import ChangeGenre from "./series_genres";



export default function GenresSeries() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || '';
    const genreName = searchParams.get('genre') || '';
    const page = searchParams.get('page') || '1';

    const [genres, setGenres] = useState<IGenres[]>([]);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getGenres()
        getTotalPages()
    },[]);

    const getTotalPages = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${id}&language=pt-BR`, optionsApi)
                            .then(res => res.json());
        
        setTotalPages(response.total_pages);
    }

    const getGenres = async () => {
        const response = await fetch('https://api.themoviedb.org/3/genre/tv/list?language=pt-BR', optionsApi)
                            .then(res => res.json());

        setGenres(response.genres);
    };


    return (
        <section className={style.series_genre_container}>
            <ChangeGenre genres={genres} genre_id={id}/>
            <Suspense fallback={<Loading/>}>
                <SeriesGenres genre_id={id} page={parseInt(page)} />
            </Suspense>
            <GenrePages genre_id={id} genre_name={genreName} page={parseInt(page)} totalPages={totalPages}/>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3068788226321043"
          crossOrigin="anonymous"></script>
        </section>
    )
}