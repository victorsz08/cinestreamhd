import { IMovie } from "@/app/types";
import style from "./slide_movie.module.css";
import Link from "next/link";
import { FaRegPlayCircle } from "react-icons/fa";
import { optionsApi } from "@/app/services/optionsApi";




export default async function SlideMovieHome() {
    const response_movies: any = await fetch(`https://api.themoviedb.org/3/movie/popular?language=pt-BR`, optionsApi)
        .then(response => response.json());
    let movies_home: IMovie[] = [];

    for(let i = 0; i < 3; i++) {
        movies_home.push(response_movies.results[i])
    };

    return (
        <div className={`${style.movies_home_container} movie_container`}>
        {movies_home && movies_home.map((movie, index) => (
        <div className={`${style.movie_card} movie_card`} key={index}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          backgroundSize: "cover",
          height: "60vh",
          position: "relative",
          width: '100vw'
        }} >
          <div
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            filter: "brightness(20%)",
          }}
        ></div>
          <div className={style.infos_container}> 
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <Link href={`/filmes?name=${movie?.title?.split(" ").join("-")}&id=${movie?.id}`}><FaRegPlayCircle/>ASSISTA AGORA</Link>
          </div>
        </div>))}</div>
    )
}