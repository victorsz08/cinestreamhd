"use client"

import CardMovie from "@/app/components/CardMovie";
import { IMovie } from "@/app/types";
import { FormEvent, useEffect, useState } from "react";
import style from "./movie.module.css";
import { optionsApi } from "@/app/services/optionsApi";



export default function Movies() {
    const [value, setValue] = useState("");
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [visiblePages, setVisiblePages] = useState<number[]>([]);
    
    useEffect(() => {
        fetchMovie();
    }, [page]);

    useEffect(() => {
        setPage(1);
    }, [value]);

    useEffect(() => {
        fetchMoviesPopular();
    },[page])

    const fetchMoviesPopular = async () => {
        try {
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, optionsApi);
            const data = await response.json();
            
            setMovies(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Error fetching popular movies:", error);
        }
    }

    const goToPreviousPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    const goToNextPage = () => {
        if (page < totalPages) {
            setPage(page + 1);
        }
    };

    useEffect(() => {
        updateVisiblePages();
    }, [page, totalPages]);

    const updateVisiblePages = () => {
        const totalPagesToShow = 7;
        const halfTotalPagesToShow = Math.floor(totalPagesToShow / 2);
        let startPage = page - halfTotalPagesToShow;
        let endPage = page + halfTotalPagesToShow;

        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(totalPages, totalPagesToShow);
        }

        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, totalPages - totalPagesToShow + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        setVisiblePages(pages);
    };

    const fetchMovie = async () => {
        if(!value) {
            return
        }
        const series = await fetch(`https://api.themoviedb.org/3/search/movie?query=${value}&page=${page}`, optionsApi)
                             .then(response => response.json()).catch(err => console.log(err))

        setMovies(series.results);
        setTotalPages(series.total_pages);
    }

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        fetchMovie();
    }

    return (
        <section className={style.movie_page_container}>
            <main>
                <form onSubmit={handleSearch} className={style.form_container}>
                    <h1>Buscar filmes</h1>
                    <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Buscar filmes..." />
                    <button type="submit">pesquisar</button>
                </form>
            </main>
            <img id={style.banner} src="https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            {movies && <div className={style.results_container}>
                {movies.map(movie => (
                    <CardMovie movie={movie} key={movie?.id} />
                ))}
            </div>}
            {totalPages > 1 &&
                <section>
                    <div className={style.actions_container}>
                        <button disabled={page <= 1 && true} onClick={goToPreviousPage}>ANTERIOR</button>
                        {visiblePages.map((pageNumber) => (
                            <button key={pageNumber} onClick={() => setPage(pageNumber)} className={pageNumber === page ? style.current_page : ''}>
                                {pageNumber}
                            </button>
                        ))}
                        <button disabled={page >= totalPages && true} onClick={goToNextPage}>PRÓXIMA</button>
                    </div>
                </section>
            }
        </section>
    )
}
