"use client";

import styled from "styled-components";
import { ISeasons, ISerieTv } from "../types";
import Link from "next/link";

import { useEffect, useState } from "react";
import api from "../services/api";
import { formatDate } from "../services/utils";


const CardSeasonStyle = styled.div`
    padding: 1rem;
    height: 24rem;
    width: 13rem;
    box-shadow: 0 0 2px #3a3a3a;
    text-align: left;
    display: grid;
    justify-content: center;
    align-items: center;
    border-radius: 1.2rem;
    position: relative;


    a {
        text-decoration: none;
    }

    img {
        width: 10rem;
        border-radius: 1rem;
        transition: .3s;
    }

    img:hover {
        transform: scale(105%);
        transition: .3s;
    }

    .infos h3 {
        font-size: .8rem;
        padding: 0;
        border: none;
        margin: 1rem 0;
    }

    .infos p, .infos strong {
        font-size: .5rem;
    }

    .infos strong {
        margin-right: .6rem;
    }
`

export default function CardSeason({ id, air_date, episode_count, poster_path, season_number, name , serie_id } : ISeasons){
    const [serie, setSerie] = useState<ISerieTv>();
    const titleSerie = serie?.name?.split(" ").join("+");

    useEffect(() => {
        api.get(`tv/${serie_id}`)
            .then(res => {
                setSerie(res.data)
            }).catch(err => {
                console.log(err?.response.data)
            })
    },[serie_id])

    return (
        <CardSeasonStyle>
            <Link href={`${titleSerie}-${serie_id}/season/${season_number}`}>
                <img src={`https://image.tmdb.org/t/p/original${poster_path}`}/>
                <div className="infos">
                    <h3>{name}</h3>
                    <p><strong>Episódios:</strong>{episode_count} Episódios</p>
                    <p><strong>Data de Lançamento:</strong>{formatDate(air_date)}</p>
                </div>
            </Link>
        </CardSeasonStyle>
    )
}