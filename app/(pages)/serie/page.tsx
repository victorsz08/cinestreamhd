'use client';

import CardSerieTv from "@/app/components/CardSerieTv";
import style from "./serie.module.css";
import { ISerieTv } from "@/app/types";
import { FormEvent, useEffect, useState } from "react";
import { optionsApi } from "@/app/services/optionsApi";

export default function Serie(){
    const [response, setResponse] = useState<ISerieTv[]>([]);
    const [serie, setSerie] = useState('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [visiblePages, setVisiblePages] = useState<number[]>([]);

    useEffect(() => {
        fetchSerie();
    }, [page]);

    useEffect(() => {
        setPage(1);
    }, [serie]);


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

    const fetchSerie = async () => {
        const series = await fetch(`https://api.themoviedb.org/3/search/tv?query=${serie}&page=${page}`, optionsApi)
                             .then(response => response.json());

        setResponse(series.results);
        setTotalPages(series.total_pages);
    }

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        fetchSerie();
    }

    return (
        <section className={style.movie_page_container}>
            <main>
                <form onSubmit={handleSearch} className={style.form_container}>
                    <h1>Buscar series</h1>
                    <input name="series" type="text" placeholder="Buscar series..." value={serie} onChange={(e) => setSerie(e.target.value)}/>
                    <button type="submit">pesquisar</button>
                </form>
            </main>
            <img id={style.banner} src="https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            {response && <div className={style.results_container}>
                {response.map(serie => (
                    <CardSerieTv serie={serie} key={serie?.id} />
                ))}
            </div>}
            {totalPages > 1 &&
                <section>
                    <div className={style.actions_container}>
                        <button disabled={page <= 1} onClick={goToPreviousPage}>ANTERIOR</button>
                        {visiblePages.map((pageNumber) => (
                            <button key={pageNumber} onClick={() => setPage(pageNumber)} className={pageNumber === page ? style.current_page : ''}>
                                {pageNumber}
                            </button>
                        ))}
                        <button disabled={page >= totalPages} onClick={goToNextPage}>PRÓXIMA</button>
                    </div>
                </section>
            }
        </section>
    )
}
