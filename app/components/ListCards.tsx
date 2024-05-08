"use client";

import styled from "styled-components";

const ListStyled = styled.main`
    padding: 4rem 1rem;
    margin-top: 2rem;

    h2 {
        padding: 0 1rem;
        border-left: 8px solid #5C0099;
    }

    .cards-container {
        margin: 2rem 0;
        display: flex;
        justify-content: flex-start;
        gap: 15px;
        overflow-x: scroll;
        padding: 1rem 0;
    }
`


export default function ListCard({ title, children } : { title: string, children: React.ReactNode }){
    return (
        <ListStyled>
            <h2>{title}</h2>
            <div className="cards-container">
                {children}
            </div>
        </ListStyled>
    )
}