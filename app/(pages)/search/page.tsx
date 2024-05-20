'use client';

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Loading from "@/app/loading";
import SearchResults from "@/app/components/SearchResults/SearchResults";
import { optionsApi } from "@/app/services/optionsApi";
import style from "./movies.module.css";
import Head  from 'next/head'
import SearchPages from "./search_pages";



export default function Movie() {
    const searchParams = useSearchParams();
    const search = searchParams.get('search') || '';
    const pageParams = searchParams.get('page') || "1";

    const [totalPages, setTotalPages] = useState(0);

    const getPages = async () => {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${search?.split("-").join(" ")}&page=${pageParams}&language=pt-BR`, optionsApi)
                                    .then(res => res.json());
        setTotalPages(response.total_pages);
    }

    useEffect(() => {
        getPages();
    },[search])

    return (
        <Suspense fallback={<Loading/>}>
            <SearchResults search={search} page={parseInt(pageParams)}/>
                <SearchPages page={parseInt(pageParams)} search={search} totalPages={totalPages}/>
                <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3068788226321043"
                    crossOrigin="anonymous"></script>
          </Suspense>
    )
}