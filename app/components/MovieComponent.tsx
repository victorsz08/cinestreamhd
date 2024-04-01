"use client";

import { useState } from "react";
import { IMovie } from "../types";
import styled from "styled-components";
import { formatDate } from "../services/utils";


const MovieStyled = styled.section`

`

export default function MovieComponent(data : IMovie){
    return (
        <MovieStyled>
            <div className="movie-container">
                <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`}/>
                <div className="infos">
                    <h1>{data.title}</h1>
                    <p>{data.tagline}</p>
                    <h3>Sinopse</h3>
                    <p>{data.overview}</p>
                    <div className="more-infos">
                        <div>
                            <h4>Data de Lançamento</h4>
                            <p>{formatDate(data.release_date)}</p>
                        </div>
                        <div>
                            <h4>Gênero</h4>
                            {data.genres?.map(genre => ( <div className="genres"><p>{genre.name}</p></div>))}
                        </div>
                        <div>
                            <h4>Duração</h4>
                            <p>{data.runtime}</p>
                        </div>
                    </div>
                </div>
            </div>
            <img src={`https://image.tmdb.org/t/p/original${data?.backdrop_path}`} alt={data?.title}/>
        </MovieStyled>
    )
}