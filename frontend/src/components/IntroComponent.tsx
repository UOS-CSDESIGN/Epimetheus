import styled from 'styled-components';
import React from 'react';

const IntroDiv = styled.div`
    display: flex;
    width: 80vw;
    height: 5vh;
    justify-content: flex-start;
    overflow: auto;
    border: 0;
    resize: none;
    flex-direction: column;
    background-color: #fff;
    color: #828282;
    vertical-align: center;
    padding-left: 1vw;
    padding-top: 1vh;
    padding-bottom: 1vh;
    font-family: Inter;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 3rem;
    border-radius: 20px;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
    vertical-align: center;
`;

interface IntroProps {
    intro: string;
}

export default function IntroComponent({ intro }: IntroProps) {
    return <IntroDiv> {intro}</IntroDiv>;
}
