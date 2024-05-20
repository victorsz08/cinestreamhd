import { IGenres } from "@/app/types"
import style from './genres_series.module.css';
import { redirect } from "next/navigation";


type IProps = {
    genres: IGenres[];
    genre_id: string;
}


export default function ChangeGenre({ genres, genre_id } : IProps){
    async function changeGenre(form: FormData) {
        const data = form.get('genre');

        if(!data) {
            return
        }

        const genre = genres.filter(obj => obj.id == data);

        redirect(`/series/generos?genre=${genre[0].name.split(' ').join('-')}&id=${genre[0].id}&page=1`);
    }


    return (
        <div className={style.genres_container}>
                {genres && genres.map(genre => (
                    <form action={changeGenre} key={genre.id}>
                    <button name="genre" value={genre.id} className={genre.id == genre_id ? style.active : ''} key={genre.id}>{genre.name}</button>
                    </form>
                ))}
        </div>
    )
}