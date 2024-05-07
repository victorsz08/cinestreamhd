import { optionsApi } from "@/app/services/optionsApi";
import style from "./episode.module.css";
import { IEpisodes } from "@/app/types";
import Link from "next/link";
import { TfiMenuAlt } from "react-icons/tfi";
import { Metadata, ResolvingMetadata } from "next";


type Props = {
    params: { serie_id: string }
}
   
  export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const [,id] = params.serie_id.split("-")
   
    const response = await fetch(`https://api.themoviedb.org/3/tv/${id}`, optionsApi).then(response => response.json());
    
    return {
      title: "CineStream: "+ response.name
    }
}



export default async function Episode({ params } : { params: { season_number: number, episode_id: any, serie_id: string }}){
    const [,serieId] = params.serie_id.split("-");
    const [,episodeId] = params.episode_id.split("-");
    

    const response: IEpisodes = await fetch(`https://api.themoviedb.org/3/tv/${serieId}/external_ids`,optionsApi).then(response => response.json())
    .catch(err => console.error(err));

    return (
        <section className={style.episode_container}>
             <h2>ASSISTIR AGORA!</h2>
             <iframe id="EmbedderContainer" 
                src={`https://embedder.net/e/series?imdb=${response.imdb_id}&sea=${params.season_number}&epi=${episodeId}`}
                width="100%" 
                height="100%" 
                allowFullScreen
            ></iframe>
            <Link href={`/serie/${params.serie_id}/season/${params.season_number}`}><TfiMenuAlt/>LISTA DE EPISODIOS</Link>
        </section>
    )

}