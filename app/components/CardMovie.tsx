import styled from "styled-components";
import { IMovie } from "../types";
import { formatDate } from "../services/utils";
import GraphicCard from "./GraphicCard";
import Link from "next/link";
import { Suspense } from "react";
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

export default function CardMovie( {movie} : { movie: IMovie}){
    const titleMovie = movie?.title?.split(" ").join("+")

    return (
        <CardStyle>
            <Link href={`/filme/${titleMovie}-${movie.id}`}> 
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title || ""} />
                <div className="titles">
                    <div className="infos">
                        <h2>{movie.title}</h2>
                        <p>{formatDate(movie.release_date)}</p>
                    </div>
                    <GraphicCard percent={movie.vote_average || "100"}/>
                </div>
            </Link>
        </CardStyle>
    )
}