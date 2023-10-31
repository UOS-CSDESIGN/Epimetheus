import styled from 'styled-components';
import React, { useEffect } from 'react';
interface TaskCodeProps {
    code: string[];
}

const CodeDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 80vw;
    margin-left: 4rem;
    margin-right: 4rem;
    margin-top: 2rem;
    flex-shrink: 0;
    background-color: #fff;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
`;

const AnswerDiv = styled.textarea`
    border-radius: 20px;
    padding-top: 1vh;
    padding-left: 2vw;
    padding-right: 2vw;
    font-size: 1.6rem;
    width: 76vw;
    margin-left: 4rem;
    margin-right: 4rem;
    resize: none;
    justify-content: flex-start;
    align-items: center;
    height: 40%;
    line-height: 3rem;
    border: 0;
    background-color: #fff;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
`;

export default function TaskCodeViewComponent(props: TaskCodeProps) {
    const codeString = props.code.join('\n');
    const code = 'Hello World!';
    return <AnswerDiv value={codeString} />;
}
