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
    font-size: 1.6rem;
    width: 96%;
    resize: none;
    height: auto;
    line-height: 2rem;
    border: 0;
    background-color: #fff;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
`;

export default function TaskCodeViewComponent(props: TaskCodeProps) {
    const code = props.code;
    return <AnswerDiv value={code} />;
}
