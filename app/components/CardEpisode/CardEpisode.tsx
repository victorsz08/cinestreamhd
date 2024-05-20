'use client';

import { IEpisodes } from "@/app/types";
import style from "./card_episode.module.css";
import { formatDate } from "@/app/services/utils";
import Link from "next/link";



export default function CardEpisode({ episode, series_imdb_id } : { episode: IEpisodes, series_imdb_id?: string }) {
    return (
        <div className={style.card_episode_container}>
            <Link target="_blank" href={`https://embed.warezcdn.com/serie/${series_imdb_id}/${episode.season_number}/${episode.episode_number}`}>
            <img src={`https://image.tmdb.org/t/p/original${episode.still_path}`}/>
            <div className={style.infos_container}>
                <h3>{episode.name}</h3>
                <h6>TEMPORDA: {episode.season_number} EPISÓDIO: {episode.episode_number}</h6>
                <p>{formatDate(episode.air_date || "")}</p>
            </div>
        </Link>
        </div>
    )
}