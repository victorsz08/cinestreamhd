import Link from "next/link";
import { formatDate } from "@/app/services/utils";
import style from "./card_series.module.css";
import ChartCircle from "../GraphicCard";
import { ISerieTv } from "@/app/types";




export default function CardSerieTv({ serie } : { serie: ISerieTv } ){
    const titleSerie = serie?.name?.split(" ").join("-");

    return (
        <div className={style.serie_card_container}>
        <Link href={`/series?name=${titleSerie}&id=${serie.id}`}> 
            <img src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} alt={serie.name || ""} />
            <div className={style.titles}>
                <div className={style.infos}>
                    <h2>{serie.name}</h2>
                    <p>{formatDate(serie.first_air_date)}</p>
                </div>
                <div className={style.chart_container}>
                    <ChartCircle height={70} width={100} totalVotes={serie.vote_count || 100} voteAverage={serie.vote_average || 1}/>
                </div>
            </div>
        </Link>
    </div>
    )
}