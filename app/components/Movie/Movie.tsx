import { formatDate } from "@/app/services/utils";
import Link from "next/link";
import style from "./movie.module.css";
import { optionsApi } from "@/app/services/optionsApi";
import { IMovie } from "@/app/types";
import ChartCircle from "../GraphicCard";

export default async function MovieComponent({ id }: { id: string }) {
  const movie: IMovie = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=pt-BR`,
    optionsApi
  ).then((res) => res.json());

  return (
    <section className={style.movie_container}>
      <div
      className={style.banner}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path})`,
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            filter: "brightness(20%)",
          }}
        ></div>
        <div className={style.infos_container}>
          <img
            alt={movie?.title}
            src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
          />
          <div className={style.infos}>
            <h1>{movie?.title}</h1>
            <p>{movie?.tagline}</p>
            <h5>SINÓPSE:</h5>
            <p>{movie?.overview}</p>
            <div className={style.details_container}>
              <div className={style.details}>
                <h6>DURAÇÃO</h6>
                <p>{movie?.runtime}min</p>
              </div>
              <div className={style.details}>
                <h6>DATA DE LANÇAMENTO</h6>
                <p>{formatDate(movie?.release_date)}</p>
              </div>
            </div>
            <h6>GÊNEROS</h6>
            <div className={style.genres}>
              {movie?.genres?.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <div className={style.chart_container}>
              <ChartCircle
                height={90}
                width={110}
                totalVotes={movie?.vote_count || 1000}
                voteAverage={movie?.vote_average || 100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.text_title}>
        <h2>ASSISTA AGORA ONLINE!</h2>
      </div>
      <section className={style.player_container}>
        <iframe
          className={style.player}
          src={`https://embed.warezcdn.com/filme/${movie.imdb_id}#whitetheme#noEpList#color6c5ce7`}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </section>
    </section>
  );
}
