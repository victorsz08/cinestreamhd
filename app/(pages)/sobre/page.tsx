import { Metadata } from "next";
import style from "./about.module.css";





export const metadata: Metadata = {
    title: "CineStream: Sobre",
    description: "Informações sobre o site CineStream"
}


export default function About() {
    return (
        <section className={style.about_container}>
            <div className={style.title}>
                <h1>Cine</h1>
                <h1>Stream</h1>
            </div>
            <h3>Sobre o site</h3>
            <div className={style.info_container}>
            <p>Bem-vindo ao CineStream, o seu destino definitivo para explorar o vasto mundo do entretenimento cinematográfico e televisivo! No CineStream, oferecemos uma ampla gama de informações sobre filmes, séries de TV e muito mais, tudo com a conveniência de poder assisti-los online.
            </p>
            <p>
            É importante notar que, embora possamos fornecer acesso a esses conteúdos, não somos responsáveis pelos filmes ou séries disponíveis em nosso site. Não mantemos um banco de dados próprio para armazenar esses vídeos; eles são fornecidos por provedores externos.
            </p>
            <p>
            Queremos garantir que nossos usuários estejam cientes dos riscos associados à visualização de conteúdo pirata. Ao assistir filmes ou séries por meio de fontes não oficiais, você pode estar violando leis de direitos autorais e colocando seus dispositivos em risco de malware e outras ameaças online.
            </p>
            <p>
            Embora reconheçamos a conveniência e a acessibilidade do streaming online, incentivamos fortemente nossos usuários a optarem por plataformas legais e licenciadas para desfrutar de seus filmes e programas favoritos. Ao fazer isso, você apoia a indústria do entretenimento e ajuda a garantir a produção contínua de conteúdo de alta qualidade.
            </p>
            <p>
            No CineStream, buscamos fornecer uma experiência informativa e envolvente, mas também promovemos a responsabilidade e o respeito pelos direitos autorais. Explore nosso site com consciência e desfrute de uma jornada emocionante pelo mundo do entretenimento!
            </p>
            </div>
        </section>
    )
}