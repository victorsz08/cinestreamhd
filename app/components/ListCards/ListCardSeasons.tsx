import { ISeasons, ISerieTv } from "@/app/types";
import style from "./list_cards.module.css";
import CardSeason from "../CardSeason/CardSeason";
import { optionsApi } from "@/app/services/optionsApi";




export default async function ListCardSeasons({ serie_id  } : { serie_id?: string }) {
    const serie: ISerieTv = await fetch(`https://api.themoviedb.org/3/tv/${serie_id}?language=pt-BR`, optionsApi).then(res => res.json());
    const seasons: ISeasons[] | undefined = serie.seasons;

    return (
      <div className={style.list_card_container}>
        <h2>TODAS AS TEMPORADAS DE {serie.name?.toUpperCase()}</h2>
        <div className={style.cards_container}>
          {seasons && seasons.map(season => (
            <CardSeason season={season} series_name={serie.name || ""} series_id={serie_id || "1"} key={season.id}/>
          ))}
        </div>
      </div>
    )
  }