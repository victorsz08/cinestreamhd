import { IMovie, ISerieTv } from "@/app/types";
import CardMovie from "../CardMovie/CardMovie";
import CardSerieTv from "../CardSerieTv/CardSerieTv";
import style from "./search_results.module.css";
import { optionsApi } from "@/app/services/optionsApi";

export default async function SearchResults({
  search,
  page,
}: {
  search: string;
  page: number;
}) {
  const response_search = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${search
      ?.split("-")
      .join(" ")}&page=${page}&language=pt-BR`,
    optionsApi
  ).then((res) => res.json());

  const response: IMovie[] & ISerieTv[] = response_search.results;

  return (
    <section className={style.movie_search_container}>
      <h1>RESULTADOS PARA: {search?.split("-").join(" ").toUpperCase()}</h1>
      <div className={style.movies_container}>
        {response &&
          response.map((res) =>
            res.media_type === "movie" ? (
              <CardMovie movie={res} key={res.id} />
            ) : (
              <CardSerieTv serie={res} key={res.id} />
            )
          )}
      </div>
    </section>
  );
}
