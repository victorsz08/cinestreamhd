import styled from "styled-components";
import Link from "next/link";
import { formatDate } from "../services/utils";


const CardSearch = styled.div`
    

    a {
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        padding: .8rem;
    }

    a img {
        width: 3rem;
        margin-right: 1rem;
    }
    
    a h3 {
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

export default function CardMovieSearch({ data } : { data: any }){
    return (
        <CardSearch>
            <Link href={data.media_type === "movie" ? `/filme/${data.title.split(" ").join("+")}-${data.id}` : `/serie/${data.name.split(" ").join("+")}-${data.id}`}>
            <img src={`https://image.tmdb.org/t/p/original${data.poster_path}`}/>
            <div className="infos">
                <h3>{data.title || data.name}</h3>
                <p>Data de Lançamento: {formatDate(data.release_date || data.first_air_date)}</p>
            </div>
            </Link>
        </CardSearch>
    )
}