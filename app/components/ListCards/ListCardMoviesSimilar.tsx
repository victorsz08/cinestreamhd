import { IMovie } from "@/app/types";
import style from "./list_cards.module.css";
import { optionsApi } from "@/app/services/optionsApi";
import CardMovie from "../CardMovie/CardMovie";






export default async function ListMoviesSimilar({ id } : { id: string }) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?language=pt-BR`, optionsApi).then(res => res.json());
    const movies: IMovie[] = response.results;
  
    return (
      <div className={style.list_card_container}>
        <h2>FILMES SIMILARES</h2>
        <div className={style.cards_container}>
          {movies.map(movie => (
            <CardMovie movie={movie} key={movie.id}/>
          ))}
        </div>
      </div>
    )
}