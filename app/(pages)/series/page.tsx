'use client';

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Loading from "@/app/loading";
import SerieComponent from "@/app/components/Serie/Serie";
import ListCardSeasons from "@/app/components/ListCards/ListCardSeasons";
import ListSerieSimilar from "@/app/components/ListCards/ListCardSerieSimilar";




export default function Series() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id') || "1";

    return (
      <Suspense fallback={<Loading/>}>
        <SerieComponent id={id}/>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3068788226321043"
          crossOrigin="anonymous"></script>
        <ListSerieSimilar id={id}/>
      </Suspense>
    )
}