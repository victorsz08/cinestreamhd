"use client"

import styled from "styled-components";


type IGraphic = {
    percent: string;
}

const GraphicStyled = styled.div`
    h3 {
        position: absolute;
        color: #fff;
        font-size: .7rem;
        transform: translate(14px, -50px);
    }

    @media (max-width: 376px) {
        display: none;
    }

    @media (max-width: 600px) {
        display: none;
    }

`

export default function GraphicCircle({ percent } : IGraphic ) {
    const percentFormated = (parseInt(percent) / 10) * 100;

    const percentCalc = percentFormated * 155 / 100; 

    return (
        <GraphicStyled>
            <svg width="70px" height="70px">
                <circle
                r="25" 
                cx="27" 
                cy="30" 
                stroke="#5C0099" 
                strokeWidth="4px" 
                fill="none" 
                strokeDasharray="155" 
                strokeDashoffset={155 - percentCalc}></circle>
            </svg>
            <h3>{percentFormated}%</h3>
        </GraphicStyled>
    )
}