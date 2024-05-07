"use client";

import styled from "styled-components";
import { IPeople } from "../types";




const CardPeopleStyle = styled.div`
    text-align: left;
    padding: 1rem;
    background-color: #d6d6d6;

    img {
        width: 120px;
    }

    .infos-people h4, .infos-people p {
        font-size: .6rem;
        color: #000;
    }

    .infos-people h4 {
        font-weight: 700;
    }

`

export default function CardPeople({ profile_path, name, character } : IPeople){
    return (
        <CardPeopleStyle>
            <img src={`https://image.tmdb.org/t/p/original${profile_path}`}/>
            <div className="infos-people">
                <h4>{name}</h4>
                <p>{character}</p>
            </div>
        </CardPeopleStyle>
    )
}