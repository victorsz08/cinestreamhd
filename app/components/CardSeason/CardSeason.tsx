'use client';

import style from "./card_season.module.css";
import { ISeasons  } from "../../types/index";
import Link from "next/link";
import { formatDate } from "../../services/utils";


export default async function CardSeason({ season, series_name, series_id } : { season : ISeasons, series_name: string , series_id?: string }){
    const name_decode = encodeURIComponent(series_name);

    return (
        <div className={style.card_season_container}>
            <Link href={`series/seasons?serie=${name_decode.split(" ").join("-")}&id=${series_id}&sea=${season?.season_number}`}>
                <img src={`https://image.tmdb.org/t/p/original${season?.poster_path}`}/>
                <div className={style.infos}>
                    <h3>{season?.name}</h3>
                    <p><strong>Episódios:</strong>{season?.episode_count} Episódios</p>
                    <p><strong>Data de Lançamento:</strong>{formatDate(season?.air_date)}</p>
                </div>
            </Link>
        </div>
    )
}