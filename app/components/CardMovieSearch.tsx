import styled from "styled-components";
import { IMovie, ISerieTv } from "../types";


const CardSearch = styled.div`
    display: flex;
    justify-content: flex-start;
    padding: .8rem;

    img {
        width: 3rem;
        margin-right: 1rem;
    }
    
    h3 {
        font-size: .8rem;
        color: #000;
    }

    p {
        font-size: .5rem;
        color: #000;
    }

    .infos {
        padding: .4rem;
    }
`

export default function CardMovieSearch({ data } : { data: IMovie | ISerieTv }){
    return (
        <CardSearch>
            <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`}/>
            <div className="infos">
                <h3>{data.title || data.name}</h3>
                <p>Data de Lançamento: {data.release_date || data.first_air_date}</p>
            </div>
        </CardSearch>
    )
}