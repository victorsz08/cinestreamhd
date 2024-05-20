import { revalidatePath, revalidateTag } from "next/cache";
import style from "./form.module.css";
import { redirect } from "next/navigation";
import { IoSearchCircleSharp } from "react-icons/io5";





export default function SearchMovies() {
    async function handleSearchMovies(form: FormData) {
        'use server'

        const data = form.get('search');

        if(!data){
            return
        }
        
        const res = data?.toString().trim().split(" ").join("-");

        const resDecode = encodeURIComponent(res || "");
        revalidateTag('search');
        revalidatePath('/(pages)/search', 'layout');
        revalidatePath('/search', 'page');
        form.delete('search');
        redirect(`/search?search=${resDecode}&page=1`);
    }

    return (
        <form className={style.form_container} action={handleSearchMovies}>
            <input name="search" placeholder="Buscar Filmes, Series de TV...."/>
            <button type="submit"><IoSearchCircleSharp/></button>
        </form>
    )
}