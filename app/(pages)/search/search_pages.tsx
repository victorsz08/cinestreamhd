import { redirect } from 'next/navigation';
import style from './movies.module.css';



type IProps = {
    page: number;
    totalPages: number;
    search: string;
}


export default function SearchPages({ page, totalPages, search } : IProps){
    async function goToNextPage(){
        if(page >= totalPages){
            return
        }
        redirect(`/search?search=${search.split(' ').join('-')}&page=${page + 1}`)
    }

    async function goToPreviewPage() {
        if(page <= 1){
            return
        }
        redirect(`/search?search=${search.split(' ').join('-')}&page=${page - 1}`)
    }
    
    return (
        <div className={style.actions_container}>
            <form action={goToPreviewPage}>
                <button disabled={page <= 1 && true}>ANTERIOR</button>
            </form>
                <h6>{page}</h6>
                <p>de</p>
                <h6>{totalPages}</h6>
            <form action={goToNextPage}>
                <button disabled={page >= totalPages && true}>PRÓXIMA</button>
            </form>
        </div>
    )
}