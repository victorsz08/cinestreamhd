"use client"

import styled from "styled-components";

const ListStyled = styled.main`
    padding: 4rem 1rem;
    margin-top: 2rem;

    h2 {
        padding: 0 1rem;
        border-left: 8px solid #5C0099;
    }

    .cards-container {
        display: flex;
        justify-content: flex-start;
        gap: 15px;
        overflow-x: scroll;
        padding: 1rem 0;
        transition: .3s;
    }

    .actions {
        margin: .3rem 0;
    }

    .actions button {
        border: 1px solid #140021;
        padding: .5rem .8rem;
        font-weight: 600;
        color: #FFF;
        background-color: #5C0099;
        cursor: pointer;
        transition: .2s; 
    }

    .actions button.selected {
      background-color: #140021;
      transition: .2s; 
    }
`;

interface ListCardProps {
  title?: string;
  children?: React.ReactNode;
  onclick(category: string): void;
  selectedCategory?: string;
  listReference?: string;
  actions?: boolean;
}

export default function ListCard({ title, listReference, actions, children, onclick, selectedCategory }: ListCardProps) {

  return (
    <ListStyled>
      <h2>{title}</h2>
      {actions && <div className="actions">
        <button className={selectedCategory === "popular" ? "selected" : ""} 
        onClick={() => onclick("popular")}>POPULAR</button>
        <button className={selectedCategory === "now_playing" || selectedCategory === "airing_today" ? "selected" : ""} 
        onClick={() => onclick(listReference === "movie" ? "now_playing" : "airing_today")}>{listReference === "movie" ? "ASSISTA AGORA" : "NOVOS EPISÓDIOS"}</button>
        <button className={selectedCategory === "top_rated" ? "selected" : ""} 
        onClick={() => onclick("top_rated")}>MAIS VOTADOS</button>
        <button className={selectedCategory === "upcoming" || selectedCategory === "on_the_air" ? "selected" : ""} 
        onClick={() => onclick(listReference === "movie" ? "upcoming" : "on_the_air")}>{listReference === "movie" ? "EM BREVE" : "NO AR"}</button>
      </div>}
      <div className="cards-container">
        {children}
      </div>
    </ListStyled>
  )
}
