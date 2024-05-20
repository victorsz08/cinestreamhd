'use client';

import style from "./home.module.css";
import { Suspense, useEffect, useRef, useState } from "react";
import ListCardMoviesPopular from "./components/ListCards/ListCardsMoviesPopular";
import ListCardSeriesPopular from "./components/ListCards/ListCardSeriesPopular";
import Loading from "./loading";
import SlideMovieHome from "./components/SlipeMovieHome/SlideMovieHome";


export default function Home() {

  return (
    <section className={style.home}>
      <div className={style.slide_container}>
        <SlideMovieHome/>
      </div>
        <div className={style.movies_container}>
          <Suspense fallback={<Loading/>}>
            <ListCardMoviesPopular/>
          </Suspense>
          <Suspense fallback={<Loading/>}>
            <ListCardSeriesPopular/>
          </Suspense>
        </div>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3068788226321043"
          crossOrigin="anonymous"></script>
    </section>
  );
}
