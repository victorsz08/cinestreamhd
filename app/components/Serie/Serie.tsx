import { formatDate } from "@/app/services/utils";
import ChartCircle from "../GraphicCard";
import style from "./serie.module.css";
import { optionsApi } from "@/app/services/optionsApi";
import { ISeasons, ISerieTv } from "@/app/types";

export default async function SerieComponent({ id }: { id: string }) {
  const serie: ISerieTv = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=pt-BR`,
    optionsApi
  ).then((res) => res.json());

  const external_links = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/external_ids`,
    optionsApi
  ).then((res) => res.json());

  return (
    <section className={style.serie_container}>
      <div
      className={style.banner}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${serie?.backdrop_path})`,
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <div
          style={{
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            filter: "brightness(20%)",
          }}
        ></div>
        <div className={style.infos_container}>
          <img
            alt={serie?.name}
            src={`https://image.tmdb.org/t/p/original${serie?.poster_path}`}
          />
          <div className={style.infos}>
            <h1>{serie?.name}</h1>
            <p>{serie?.tagline}</p>
            <h5>SINÓPSE:</h5>
            <p>{serie?.overview}</p>
            <div className={style.details_container}>
              <div className={style.details}>
                <h6>TEMPORADAS</h6>
                <p>{serie?.number_of_seasons} Temporadas</p>
              </div>
              <div className={style.details}>
                <h6>DATA DE LANÇAMENTO</h6>
                <p>{formatDate(serie?.first_air_date)}</p>
              </div>
            </div>
            <h6>GÊNEROS</h6>
            <div className={style.genres}>
              {serie?.genres?.map((genre) => (
                <p key={genre.id}>{genre.name}</p>
              ))}
            </div>
            <div className={style.chart_container}>
              <ChartCircle
                height={90}
                width={110}
                totalVotes={serie?.vote_count || 1000}
                voteAverage={serie?.vote_average || 100}
              />
            </div>
          </div>
        </div>
      </div>
      <div className={style.text_title}>
        <h2>ASSISTA AGORA ONLINE!</h2>
      </div>
      <div className={style.player_container}>
        <iframe
          className={style.player}
          src={`https://embed.warezcdn.com/serie/${external_links.imdb_id}#whitetheme#noEpList#color6c5ce7`}
          scrolling="no"
          frameBorder="0"
          allowFullScreen={true}
        ></iframe>
      </div>
    </section>
  );
}
