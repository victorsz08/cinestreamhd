import { optionsApi } from "@/app/services/optionsApi"
import { IMovie } from "@/app/types";
import CardMovie from "../CardMovie/CardMovie";
import style from "./movies_genres.module.css";




export default async function MoviesGenres({ genre_id, page } : { genre_id: string; page: number }) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genre_id}&page=${page}&language=pt-BR`, optionsApi)
                                    .then(res => res.json());
    const movies: IMovie[] = response.results;

    return (
        <section className={style.movies_container}>
            {movies && movies.map(movie => (
                <CardMovie movie={movie} key={movie.id}/>  
            ))}
        </section>
    )
}