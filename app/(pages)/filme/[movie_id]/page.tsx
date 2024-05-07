"use client";

import ListCard from "@/app/components/ListCards";
import style from "./movie.module.css";
import api from "@/app/services/api";
import { formatDate } from "@/app/services/utils";
import { IMovie, IPeople, ITrailer } from "@/app/types";
import { useEffect, useState } from "react";
import CardPeople from "@/app/components/CardPeople";
import CardMovie from "@/app/components/CardMovie";
import GraphicCircle from "@/app/components/Graphic";

export default function Filme({ params }: { params: { movie_id: string } }) {
  const [movie, setMovie] = useState<IMovie>();
  const [trailer, setTrailer] = useState<ITrailer>();
  const [peoples, setPeoples] = useState<IPeople[]>([]);
  const [recommendations, setRecommendations] = useState<IMovie[]>([]);
  const [,id] = params.movie_id.split("-");

  useEffect(() => {
    api
      .get(`movie/${id}`)
      .then((res) => {
        setMovie(res?.data);
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });

    api
      .get(`movie/${params.movie_id}/videos`)
      .then((res) => {
        setTrailer(res?.data.results[0]);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });

    api
      .get(`movie/${id}/credits`)
      .then((res) => {
        const renderCasts = [];

        if (res.data.cast <= 3) {
          for (let i = 0; i === undefined; i++) {
            renderCasts.push(res?.data.cast[i]);
          }
        } else if (res.data.cast.length <= 8) {
          for (let i = 0; i <= 8; i++) {
            renderCasts.push(res?.data.cast[i]);
          }
        } else {
          for (let i = 0; i <= 10; i++) {
            renderCasts.push(res?.data.cast[i]);
          }
        }

        setPeoples(renderCasts);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });

    api
      .get(`/movie/${id}/recommendations`)
      .then((res) => {
        setRecommendations(res?.data.results);
      })
      .catch((err) => {
        console.log(err?.response?.data);
      });
  }, [params]);

  return (
    <section className={style.movie}>
      <div className={style.info_movie}>
        <img src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`} />
        <div className={style.infos}>
          <h1>{movie?.title}</h1>
          <p>"{movie?.tagline}"</p>
          <h4>Sinópse</h4>
          <p>{movie?.overview}</p>
          <div className={style.more_infos}>
            <div className={style.details}>
              <h4>Duração</h4>
              <p>{movie?.runtime}min</p>
            </div>
            <div className={style.details}>
              <h4>Data de Lançamento</h4>
              <p>{formatDate(movie?.release_date)}</p>
            </div>
            <div className={style.details}>
              <h4>Companhias</h4>
              {movie?.production_companies?.map((company) => (
                <p key={company.id}>{company.name}</p>
              ))}
            </div>
          </div>
          <h4>Gênero</h4>
          <div className={style.genres}>
            {movie?.genres?.map((genre) => (
              <p key={genre.id}>{genre.name}</p>
            ))}
          </div>
          <div className={style.votes}>
            <GraphicCircle percent={movie?.vote_average || ""} />
          </div>
        </div>
      </div>
      <img
        id={style.banner}
        src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
        alt={movie?.title}
      />
        <div className={style.player_movie}>
          <h1>{`${movie?.title} (Dublado)`}</h1>
          <h3>ASSISTIR AGORA!</h3>
          <iframe
            src={`https://embedder.net/e/movie?imdb=${movie?.imdb_id}`}
            width="100%"
            height="100%"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      <div className={style.casts}>
        <ListCard title="Elenco">
          {peoples &&
            peoples.map((people, index) => (
              <CardPeople
                key={people?.id || index}
                name={people?.name}
                character={people?.character}
                profile_path={people?.profile_path}
              />
            ))}
        </ListCard>
      </div>
      <div className={style.recommendatios}>
        {recommendations && (
          <ListCard title="Recomendações">
            {recommendations &&
              recommendations.map((movie) => (
                <CardMovie key={movie.id} movie={movie} />
              ))}
          </ListCard>
        )}
      </div>
    </section>
  );
}
