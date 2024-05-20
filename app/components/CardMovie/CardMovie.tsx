import { IMovie } from "../../types";
import { formatDate } from "../../services/utils";
import Link from "next/link";
import style from "./card_movie.module.css";
import ChartCircle  from "../GraphicCard";


export default async function CardMovie( { movie } : { movie: IMovie}){
    const title = movie.title?.trim().split(" ").join("-")
    const params = encodeURIComponent(title || "");
    

    return (
        <div className={style.card_movie_container}>
            <Link href={`/filmes?name=${params}&id=${movie.id}`}> 
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title || ""} />
                <div className={style.titles}>
                    <div className={style.infos}>
                        <h2>{movie.title}</h2>
                        <p>{formatDate(movie.release_date)}</p>
                    </div>
                    <div className={style.chart_container}>
                        <ChartCircle height={70} width={100} totalVotes={movie.vote_count || 100} voteAverage={movie.vote_average || 1}/>
                    </div>
                </div>
            </Link>
        </div>
    )
}