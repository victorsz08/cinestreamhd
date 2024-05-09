"use client"

import React, { useState, useEffect } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IMovie, ISerieTv } from "./types";
import style from "./home.module.css";
import ListCard from "./components/ListCards";
import api from "./services/api";
import CardMovie from "./components/CardMovie";
import CardSerieTv from "./components/CardSerieTv";
import CardMovieSearch from "./components/CardMovieSearch";
import { optionsApi } from "./services/optionsApi";

export default function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [serie, setSerie] = useState<ISerieTv[]>([]);
  const [movieSearch, setMovieSearch] = useState<IMovie[]>([]);
  const [selectedCategoryMovie, setSelectedCategoryMovie] = useState<string>("popular");
  const [selectedCategorySerie, setSelectedCategorySerie] = useState<string>("popular");


  useEffect(() => {
    api.get("movie/popular")
      .then(res => {
        setMovies(res.data.results);
      })
      .catch(err => {
        console.log(err?.response?.data);
      });

    api.get("tv/popular")
      .then(res => {
        setSerie(res?.data.results);
      })
      .catch(err => {
        console.log(err?.response?.data);
      });
  }, []);

  const handleCategoryMovie = async (category: string) => {
    setSelectedCategoryMovie(category);
    if (category === "popular") {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=pt-BR`, optionsApi).then(response => response.json());
      setMovies(response.results);
    } else if (category === "now_playing") {
      const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR`, optionsApi).then(response => response.json());
      setMovies(response.results);
    } else if (category === "top_rated") {
      const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=pt-BR`, optionsApi).then(response => response.json());
      setMovies(response.results);
    } else if (category === "upcoming") {
      const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=pt-BR`, optionsApi).then(response => response.json());
      setMovies(response.results);
    }
  };

  const handleCategorySeries = async (category: string) => {
    setSelectedCategorySerie(category);
    if (category === "popular") {
      const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=pt-BR`, optionsApi).then(response => response.json());
      setSerie(response.results);
    } else if (category === "airing_today") {
      const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=pt-BR`, optionsApi).then(response => response.json());
      setSerie(response.results);
    } else if (category === "top_rated") {
      const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?language=pt-BR`, optionsApi).then(response => response.json());
      setSerie(response.results);
    } else if (category === "on_the_air") {
      const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR`, optionsApi).then(response => response.json());
      setSerie(response.results);
    }
  };


  useEffect(() => {
    api.get(`search/multi?query=${search}`)
      .then(res => {
        setMovieSearch(res?.data.results);
      })
      .catch(err => {
        console.log(err?.response.data);
      });
  }, [search]);

  return (
    <section className={style.home}>
      <div className={style.search}>
        <div className={style.title}>
          <h1>Cine</h1>
          <h1>Stream</h1>
        </div>
        <h1>Bem-Vindos ao CineStream, Milhões de Filmes e Series de TV. Explore!</h1>
        <form onSubmit={e => e.preventDefault()}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
          <button><IoSearchSharp /></button>
        </form>
        {movieSearch &&
          <div className={style.toggle}>
            {movieSearch.map(movie => (
              <CardMovieSearch data={movie} key={movie.id} />
            ))}
          </div>}
      </div>
      {movieSearch && <>
        <ListCard
          actions={true}
          listReference="movie"
          title="Filmes"
          selectedCategory={selectedCategoryMovie}
          onclick={handleCategoryMovie}
        >
          {movies.map(movie => (
            <CardMovie key={movie.id} movie={movie} />
          ))}
        </ListCard>
        <ListCard selectedCategory={selectedCategorySerie}
        actions={true}
        title="Series de TV" 
        onclick={handleCategorySeries}>
          {serie.map(serie => (
            <CardSerieTv serie={serie} key={serie.id} />
          ))}
        </ListCard>
      </>}
    </section>
  );
}
