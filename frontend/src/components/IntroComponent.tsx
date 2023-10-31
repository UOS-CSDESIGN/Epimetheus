import styled from 'styled-components';
import React from 'react';

const IntroDiv = styled.div`
    width: 94%;
    height: auto;
    overflow: auto;
    resize: none;
    color: #828282;
    padding-left: 3%;
    padding-right: 3%;
    padding-top: 1%;
    padding-bottom: 1%;
    margin-top: 1%;
    margin-bottom: 1%;
    font-family: Inter;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: 3rem;
    // border-bottom: solid;
    // border-width: thin;
    // border-color: #ADADAD;
    
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
`;

interface IntroProps {
    intro: string;
}

export default function IntroComponent({ intro }: IntroProps) {
    return <IntroDiv> {intro}</IntroDiv>;
}
