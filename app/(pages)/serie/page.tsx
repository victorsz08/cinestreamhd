'use client';

import CardSerieTv from "@/app/components/CardSerieTv";
import style from "./serie.module.css";
import { IGenres, ISerieTv } from "@/app/types";
import { FormEvent, useEffect, useState } from "react";
import { optionsApi } from "@/app/services/optionsApi";
import Loading from "./[serie_id]/season/[season_number]/loading";
import Image from "next/image";

// TODAS AS DESCRIÇÕES DE FUNÇÕES ESTÃO NA PAGINA DE FILMES [FUNÇÕES SIMILARES AS ESTAS]: /APP/FILME

export default function Serie(){
    const [response, setResponse] = useState<ISerieTv[]>([]);
    const [serie, setSerie] = useState('');
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [visiblePages, setVisiblePages] = useState<number[]>([]);
    const [genres, setGenres] = useState<IGenres[]>([]);
    const [genreSearch, setGenreSearch] = useState<string>("");
    const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

    useEffect(() => {
        fetchSerie();
    }, [page]);

    useEffect(() => {
        setPage(1);
    }, [serie]);

    useEffect(() => {
        fetchSeriesPopular();
        fetchGenres()
    },[page]);

    useEffect(() => {
        if(genreSearch){
            fetchSerieByGenre(genreSearch)
        }
      },[page]);


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

    const fetchGenres = async () => {
        const response = await fetch(
          "https://api.themoviedb.org/3/genre/tv/list?language=pt-BR",
          optionsApi
        ).then((response) => response.json());
    
        setGenres(response.genres);
    };

    const fetchSerieByGenre = async (genreId: string) => {
        if(!genreId){
            return
        }
        setSerie("");
        setGenreSearch(genreId);
        setSelectedGenre(genreId);
    
        if(genreSearch !== genreId){
            setPage(1);
        };
    
    
        const response = await fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${genreId}&page=${page}&language=pt-BR`, optionsApi)
            .then(response => response.json()).catch(err => console.log(err));
    
            setResponse(response.results);
            setTotalPages(response.total_pages);
      }


    const fetchSeriesPopular = async () => {
        if(serie || genreSearch) {
            return;
        }

        try {
            const response = await fetch(`https://api.themoviedb.org/3/tv/popular?page=${page}&language=pt-BR`, optionsApi);
            const data = await response.json();
            
            setResponse(data.results);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error("Error fetching popular movies:", error);
        }
    }

    const fetchSerie = async () => {
        if (!serie) {
            return;
          }
      
        setGenreSearch("");
        setSelectedGenre(null)
        const series = await fetch(`https://api.themoviedb.org/3/search/tv?query=${serie}&page=${page}&language=pt-BR`, optionsApi)
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
                    <div className={style.genre_list}>
                        {genres.map((genre) => (
                        <button onClick={() => fetchSerieByGenre(genre.id.toString())} 
                        key={genre.id}
                        className={selectedGenre === genre.id.toString() ? style.selected_genre : ""}
                        >{genre.name}</button>
                        ))}
          </div>
                </form>
            </main>
            <img alt="" id={style.banner} src="https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            
            {response && <div className={style.results_container}>
                {response.map((serie, index) => (
                    <CardSerieTv serie={serie} key={serie.id || index} />
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
