
import ListCard from "@/app/components/ListCards";
import style from "./movie.module.css";
import { formatDate } from "@/app/services/utils";
import CardPeople from "@/app/components/CardPeople";
import GraphicCircle from "@/app/components/Graphic";
import { optionsApi } from "@/app/services/optionsApi";
import { IMovie, IPeople } from "@/app/types";
import { Metadata } from "next";

type Props = {
  params: { movie_id: string }
}
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [,id] = params.movie_id.split("-")
 
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, optionsApi)
  .then(response => response.json());

  return {
    title: "CineStream: "+ response.title
  }
}

export default async function Filme({ params }: { params: { movie_id: string } }) {
  const [,id] = params.movie_id.split("-");

  const movie: IMovie = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=pt-BR`, optionsApi).then(response => response.json());
  const response = await fetch(` https://api.themoviedb.org/3/movie/${id}/credits`, optionsApi).then(response => response.json());
  const peoples: IPeople[] = await response.cast;

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
          {peoples.map((people, index) => (
              <CardPeople
                key={people?.id || index}
                name={people?.name}
                character={people?.character}
                profile_path={people?.profile_path}
              />
            ))}
        </ListCard>
      </div>
    </section>
  );
}
