import { optionsApi } from "@/app/services/optionsApi"
import { ISerieTv } from "@/app/types";
import style from "./movies_genres.module.css";
import CardSerieTv from "../CardSerieTv/CardSerieTv";




export default async function SeriesGenres({ genre_id, page } : { genre_id: string; page: number }) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?with_genres=${genre_id}&page=${page}&language=pt-BR`, optionsApi)
                                    .then(res => res.json());
    const movies: ISerieTv[] = response.results;

    return (
        <section className={style.movies_container}>
            {movies && movies.map(serie => (
                <CardSerieTv serie={serie} key={serie.id}/>  
            ))}
        </section>
    )
}