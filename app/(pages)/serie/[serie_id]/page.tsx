import style from "./serie.module.css";
import GraphicCircle from "@/app/components/Graphic";

import ListCard from "@/app/components/ListCards";
import CardSeason from "@/app/components/CardSeason";
import { optionsApi } from "@/app/services/optionsApi";
import { ISerieTv } from "@/app/types";
import { Metadata } from "next";
import { formatDate } from "@/app/services/utils";
import Image from "next/image";


type Props = {
  params: { serie_id: string }
}
 
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [,id] = params.serie_id.split("-")
 
  const response = await fetch(`https://api.themoviedb.org/3/tv/${id}?language=pt-BR`, optionsApi)
  .then(response => response.json());

  return {
    title: "CineStream: "+ response.name
  }
}


export default async function Serie({ params }: { params: { serie_id: string } }) {
  const [,serieId] = params.serie_id.split("-");

  const response: ISerieTv = await fetch(`https://api.themoviedb.org/3/tv/${serieId}?language=pt-BR`, optionsApi)
  .then(response => response.json()).catch(err => console.log(err))


  return (
    <section className={style.serie_container}>
      <div className={style.serie_info}>
        <img alt={response.name || ""} src={`https://image.tmdb.org/t/p/original${response?.poster_path}`} />
        <div className={style.infos}>
          <h1>{response?.name}</h1>
          <p>{response?.tagline}</p>
          <h4>Sinopse</h4>
          <p>{response?.overview}</p>
            <h4>Data de Lançamento do 1° Episódio:</h4>
            <p>{formatDate(response?.first_air_date)}</p>
          <div className={style.more_infos}>
            <div className={style.more_details}>
              <div className={style.details}>
                <h4>Total de Temporadas</h4>
                <p>{response?.number_of_seasons} Temporadas</p>
              </div>
              <div className={style.details}>
                <h4>Total de Episódios</h4>
                <p>{response?.number_of_episodes} Episódios</p>
              </div>
            </div>
            <div className={style.votes}>
                <GraphicCircle percent={response?.vote_average || "100"}/>
            </div>
          </div>
        </div>
      </div>
      <img alt={response.name || ""} id={style.banner} src={`https://image.tmdb.org/t/p/original${response?.backdrop_path}`}/>
      <ListCard
      onclick={async () => {
        "use server"
        return
      }}
      actions={false}
      title="Temporadas">
        {response?.seasons?.map(season => (
          <CardSeason 
            air_date={season.air_date}
            episode_count={season.episode_count}
            name={season.name}
            poster_path={season.poster_path}
            season_number={season.season_number}
            serie_id={response.id}
            key={season.id}
          />
        ))}
      </ListCard>
    </section>
  );
}
