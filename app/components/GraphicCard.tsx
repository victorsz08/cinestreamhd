"use client";

import styled from "styled-components";


const GraphicStyled = styled.div`
    h4 {
        font-size: .45rem;
        position: absolute;
        transform: translateX(10px) translateY(-35px)
    }
`

export default function GraphicCard({ percent } : { percent: string }){
    const percentFormated = (parseInt(percent) / 10) * 100;

    const percentCalc = (percentFormated * 90)/ 100 || 100; 

    return (
        <GraphicStyled>
                    <svg width="45px" height="45px">
                        <circle 
                        r="15" 
                        cx="18" 
                        cy="18" 
                        stroke="#5C0099" 
                        strokeWidth="3px" 
                        fill="none" 
                        strokeDasharray="90" 
                        strokeDashoffset={(90 - percentCalc)}></circle>
                    </svg>
                    <h4>{percentFormated}%</h4>
        </GraphicStyled>
    )
}