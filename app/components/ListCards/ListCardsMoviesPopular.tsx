
import { optionsApi } from "@/app/services/optionsApi";
import style from "./list_cards.module.css";
import { IMovie } from "@/app/types";
import CardMovie from "../CardMovie/CardMovie";



export default async function ListCardMoviesPopular() {
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=pt-BR`, optionsApi).then(res => res.json());
  const movies: IMovie[] = response.results;

  return (
    <div className={style.list_card_container}>
      <h2>FILMES POPULARES</h2>
      <div className={style.cards_container}>
        {movies.map(movie => (
          <CardMovie movie={movie} key={movie.id}/>
        ))}
      </div>
    </div>
  )
}
