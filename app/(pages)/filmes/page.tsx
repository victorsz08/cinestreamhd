"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import MovieComponent from "@/app/components/Movie/Movie";
import ListMoviesSimilar from "@/app/components/ListCards/ListCardMoviesSimilar";

export default function Movie() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return (
    <Suspense fallback={<Loading/>}>
      <MovieComponent id={id || "1"}/>
      <ListMoviesSimilar id={id || "1"}/>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3068788226321043"
          crossOrigin="anonymous"></script>
    </Suspense>
  );
}
