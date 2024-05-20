import { IGenres } from '@/app/types';
import style from './genres.module.css';
import { redirect } from 'next/navigation';



type IProps = {
    genres: IGenres[];
    genre_id: string;
}


export default function MovieGenres({ genres, genre_id } : IProps) {
    async function changeGenre(form: FormData) {
        const data = form.get('genre');

        if(!data) {
            return
        }

        const genre = genres.filter(obj => obj.id == data);

        redirect(`/filmes/generos?genre=${genre[0].name.split(' ').join('-')}&id=${genre[0].id}&page=1`);
    }
    
    return (
        <div className={style.genres_container}>
            {genres && genres.map(genre => (
                <form action={changeGenre} key={genre.id}>
                    <button className={genre.id == genre_id ? style.active : ''} 
                    key={genre.id} name='genre' value={genre.id}>{genre.name}</button>
                </form>
            ))}
        </div>
    )
}