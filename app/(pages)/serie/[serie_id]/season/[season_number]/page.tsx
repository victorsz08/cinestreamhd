import style from "./season.module.css";
import { ISeasons, ISerieTv } from "@/app/types";
import { formatDate } from "@/app/services/utils";
import GraphicCircle from "@/app/components/Graphic";
import Link from "next/link";
import { TfiMenuAlt } from "react-icons/tfi";
import { optionsApi } from "@/app/services/optionsApi";
import { Metadata } from "next";


type Props = {
    params: { serie_id: string }
}
   
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const [,id] = params.serie_id.split("-")
   
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=pt-BR`, optionsApi).then(response => response.json());

    return {
      title: "CineStream: "+ response.name
    }
}

export default async function Season({ params } : { params: { season_number: string, serie_id: string }}){
    const [,serieId] = params.serie_id.split("-");

    const response: ISeasons = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/season/${params.season_number}?language=pt-BR`, optionsApi).then(response => response.json())
    .catch(err => console.log(err))

    return (
        <section className={style.season_page}>
            <div className={style.season_info}>
                <img src={`https://image.tmdb.org/t/p/original${response?.poster_path}`}/>
                <div className={style.infos}>
                    <h1>{response?.name}</h1>
                    <h4>Data de Lançamento</h4>
                    <p>{formatDate(response?.air_date)}</p>
                    <h4>Sinópse</h4>
                    <p>{response?.overview}</p>
                    <h4>Episódios</h4>
                    <p>{response?.episodes?.length} Episódios</p>
                    <div className={style.graphic}>
                        <GraphicCircle 
                            percent={response?.vote_average || ""}
                        />
                    </div>
                </div>
            </div>
            <img id={style.banner} src={`https://image.tmdb.org/t/p/original${response?.poster_path}`}/>
            <div className={style.episode_list}>
                <h1>Lista de episódios:</h1>
                {response?.episodes?.map(ep => (
                    <div className={style.episode_info} key={ep.id}>
                        <h4><strong>Episódio {ep.episode_number}-</strong>{ep.name}</h4>
                        <Link href={`${params.season_number}/episodio/${ep.name?.split(" ").join("+")}-${ep.episode_number}`}>(Dublado)</Link>
                    </div>
                ))}
            </div>
            <div className={style.seasons}>
                <Link href={`/serie/${params.serie_id}`}><TfiMenuAlt/>TODAS AS TEMPORADAS</Link>
            </div>
        </section>
    )
}