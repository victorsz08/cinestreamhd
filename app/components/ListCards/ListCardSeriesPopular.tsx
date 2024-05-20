
import { optionsApi } from "@/app/services/optionsApi";
import style from "./list_cards.module.css";
import { ISerieTv } from "@/app/types";
import CardSerieTv from "../CardSerieTv/CardSerieTv";



export default async function ListCardSeriesPopular() {
  const response = await fetch(`https://api.themoviedb.org/3/tv/popular?language=pt-BR`, optionsApi).then(res => res.json());
  const series: ISerieTv[] = response.results;


  return (
    <div className={style.list_card_container}>
      <h2>SERIES POPULARES</h2>
      <div className={style.cards_container}>
        {series.map(serie => (
          <CardSerieTv serie={serie} key={serie.id}/>
        ))}
      </div>
    </div>
  )
}
