
import style from "./loader.module.css";



export default function Loading() {
    return (
        <div className={style.loader_container}>
            <span className={style.loader}></span>
        </div>
    )
}