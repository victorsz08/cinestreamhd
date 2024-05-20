import { IGenres } from "@/app/types";
import { redirect } from "next/navigation";
import style from './genres_series.module.css';


type IProps = {
    page: number;
    totalPages: number;
    genre_id: string;
    genre_name: string;
}



export default function GenrePages({ page, totalPages, genre_id, genre_name } : IProps) {
    async function goToNextPage(){
        if(page >= totalPages){
            return
        }
        redirect(`/series/generos?genre=${genre_name.split(' ').join('-')}&id=${genre_id}&page=${page + 1}`)
    }

    async function goToPreviewPage() {
        if(page <= 1){
            return
        }
        redirect(`/series/generos?genre=${genre_name.split(' ').join('-')}&id=${genre_id}&page=${page - 1}`)
    }

    return (
        <div className={style.actions_container}>
            <form action={goToPreviewPage}>
                <button  disabled={page <= 1 ? true : false}>ANTERIOR</button>
            </form>
                <h6>{page}</h6>
                <p>de</p>
                <h6>{totalPages}</h6>
            <form action={goToNextPage}>
                    <button disabled={page >= totalPages ? true : false}>PRÓXIMO</button>
            </form>
        </div>
    )
}