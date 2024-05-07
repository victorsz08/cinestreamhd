"use client";

import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { IMovie, ISerieTv } from "./types";
import style from "./home.module.css";
import ListCard from "./components/ListCards";
import api from "./services/api";
import CardMovie from "./components/CardMovie";
import CardSerieTv from "./components/CardSerieTv";
import CardMovieSearch from "./components/CardMovieSearch";


export default function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<IMovie[]>([]);
  const [serie, setSerie] = useState<ISerieTv[]>([]);
  const [movieSearch, setMovieSearch] = useState<IMovie[]>([]);

  useEffect(() => {
    api.get("movie/popular")
      .then(res => {
        setMovies(res.data.results)
      }).catch(err => {
        console.log(err?.response?.data)
      })

    api.get("tv/popular")
      .then(res => {
        setSerie(res?.data.results)
        console.log(res.data)
      }).catch(err => {
        console.log(err?.response?.data)
      })
  },[])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault();

    api.get(`search/movie?query=${search}`)
      .then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err?.response.data)
      })
  }

  useEffect(() => {
    api.get(`search/multi?query=${search}`)
      .then(res => {
        console.log(res.data)
        setMovieSearch(res?.data.results)
      }).catch(err => {
        console.log(err?.response.data)
      })
  }, [search])

  return (
    <section className={style.home}>
      <div className={style.search}>
        <div className={style.title}>
          <h1>Cine</h1>
          <h1>Stream</h1>
        </div>
        <h1>Bem-Vindos ao CineStream, Milhões de Filmes e Series de TV. Explore!</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
          <button><IoSearchSharp/></button>
        </form>
        {movieSearch &&
        <div className={style.toggle}>
          {movieSearch.map(movie => (
            <CardMovieSearch data={movie} key={movie.id}/>
          ))}
        </div>}
      </div>
      {movieSearch && <>
        <ListCard title="Filmes Mais Populares">
          {movies.map(movie => (
            <CardMovie key={movie.id} movie={movie}/>
          ))}
      </ListCard>
      <ListCard title="Series de TV mais Populares">
        {serie.map(serie => (
          <CardSerieTv serie={serie} key={serie.id}/>
        ))}
      </ListCard>
      </>}
    </section>
  );
}
