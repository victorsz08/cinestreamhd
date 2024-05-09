"use client";

import styled from "styled-components";
import { ISerieTv } from "../types";
import Link from "next/link";
import GraphicCard from "./GraphicCard";
import { formatDate } from "@/app/services/utils";
import Image from "next/image";


const CardStyle = styled.div`
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

.titles {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.titles .infos h2 {
    font-size: .8rem;
    padding: 0;
    border: none;
    margin: 1rem 0;
}

.titles .infos p {
    font-size: .5rem;
}

.titles {
    display: flex;
}
`


export default function CardSerieTv({ serie } : { serie: ISerieTv } ){
    const titleSerie = serie?.name?.split(" ").join("+");

    return (
        <CardStyle>
        <Link href={`/serie/${titleSerie}-${serie.id}`}> 
            <img src={`https://image.tmdb.org/t/p/original${serie.poster_path}`} alt={serie.name || ""} />
            <div className="titles">
                <div className="infos">
                    <h2>{serie.name}</h2>
                    <p>{formatDate(serie.first_air_date)}</p>
                </div>
                <GraphicCard percent={serie.vote_average || "100"}/>
            </div>
        </Link>
    </CardStyle>
    )
}