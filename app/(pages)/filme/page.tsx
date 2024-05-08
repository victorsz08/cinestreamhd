"use client";

import CardMovie from "@/app/components/CardMovie";
import { IGenres, IMovie } from "@/app/types";
import { FormEvent, useEffect, useState } from "react";
import style from "./movie.module.css";
import { optionsApi } from "@/app/services/optionsApi";

export default function Movies() {
  const [value, setValue] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const [genres, setGenres] = useState<IGenres[]>([]);
  const [genreSearch, setGenreSearch] = useState<string>("");
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  useEffect(() => {
    fetchMovie(); // FAZ A BUSCA POR PAGINAÇÃO QUANDO A PAGINA MUDA.
  }, [page]);

  useEffect(() => {
    setPage(1); // SE O VALOR DE BUSCA MUDAR, FAZ UMA NOVA BUSCA E ZERA O VALOR DE PAGINAÇÃO.
  }, [value]);

  useEffect(() => {
    fetchMoviesPopular(); // FAZ A BUSCA DE FILMES POPULARES E DOS GÊNEROS QUANDO A PAGINA É MONTADA, E SE O VALOR DA PAGINA MUDAR FAZ ESSA BUSCA COM O NOVO VALOR DE PAGINAÇÃO.
    fetchGenres();
  }, [page]);

  useEffect(() => {
    if(genreSearch){
        fetchMovieByGenre(genreSearch) // VERIFICA SE O VALOR DO GÊNERO É PRESENTE PARA FAZER UM NOVA BUSCA CPOM O NOVO VALOR DA PAGINAÇÃO
    }
  },[page]);

  const fetchGenres = async () => { // FAZ A BUSCA DE GÊNEROS NA API.
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=pt-BR",
      optionsApi
    ).then((response) => response.json());

    setGenres(response.genres);
  };


  const fetchMovieByGenre = async (genreId: string) => { // FAZ A BUSCA DE FILMES A PARTIR DO GÊNERO.
    if(!genreId){
        return
    }
    setValue(""); // SE EXISTIR ALGUM VALOR, ZERA PARA FAZER A BUSCA APENAS POR GENERO.
    setGenreSearch(genreId);
    setSelectedGenre(genreId); // SELECIONA O GÊNERO PARA DESTACAR O BOTÃO SELECIONADO.

    if(genreSearch !== genreId){
        setPage(1);
    };


    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&page=${page}&language=pt-BR`, optionsApi)
        .then(response => response.json()).catch(err => console.log(err));
        
        console.log(response);

        setMovies(response.results);
        setTotalPages(response.total_pages);
  }

  const fetchMoviesPopular = async () => { 
    if(value || genreSearch) {
        return;
    }

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${page}`,
        optionsApi
      );
      const data = await response.json();

      setMovies(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };

  const fetchMovie = async () => {
    if (!value) {
      return;
    }

    setGenreSearch(""); // SE UMA NOVA BUSCA FOR FEITA, ZERA O VALOR DOS GÊNEROS PARA BUSCAR APENAS POR NOME DO FILME.

    const movies = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${value}&page=${page}`,
      optionsApi
    )
      .then((response) => response.json())
      .catch((err) => console.log(err));

    setMovies(movies.results);
    setTotalPages(movies.total_pages);
  };

  const handleSearch = (e: FormEvent) => { // FUNÇÃO QUE CHAMA A FUNÇÃO DE BUSCA POR NOME NO EVENTO DE SUBMIT.
    e.preventDefault();
    fetchMovie();
  };

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
  }, [page, totalPages]); // ATUALIZAR AS PAGINAS DISPONIVEIS NA TELA A CADA MUDANÇA DE PAGINA E TOTAL DE PAGINAS.

  const updateVisiblePages = () => { // FUNÇÃO PARA QUANDO O USUÁRIO PASSAR PARA PRÓXIMA PAGINA MOSTRAR MAIS UM PAGINA DISPONIVEL NA FRENTE E OCULTAR A PRIMEIRA PAGINA DA LISTA.
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


  return (
    <section className={style.movie_page_container}>
      <main>
        <form onSubmit={handleSearch} className={style.form_container}>
          <h1>Buscar filmes</h1>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Buscar filmes..."
          />
          <button type="submit">pesquisar</button>
          <div className={style.genre_list}>
            {genres.map((genre) => (
              <button onClick={() => fetchMovieByGenre(genre.id.toString())} 
              key={genre.id}
              className={selectedGenre === genre.id.toString() ? style.selected_genre : ""}
              >{genre.name}</button>
            ))}
          </div>
        </form>
      </main>
      <img
        id={style.banner}
        src="https://images.unsplash.com/photo-1521967906867-14ec9d64bee8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      {movies && (
        <div className={style.results_container}>
          {movies && movies.map((movie) => (
            <CardMovie movie={movie} key={movie?.id} />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <section>
          <div className={style.actions_container}>
            <button disabled={page <= 1 && true} onClick={goToPreviousPage}>
              ANTERIOR
            </button>
            {visiblePages.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={pageNumber === page ? style.current_page : ""}
              >
                {pageNumber}
              </button>
            ))}
            <button
              disabled={page >= totalPages && true}
              onClick={goToNextPage}
            >
              PRÓXIMA
            </button>
          </div>
        </section>
      )}
    </section>
  );
}
