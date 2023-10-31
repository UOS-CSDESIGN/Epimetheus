import styled from 'styled-components';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import React, { useEffect } from 'react';

interface TaskCodeProps {
    handleButton: () => void;
    handleCode: boolean;
    code: string[];
}

const CodeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;

const AnswerDiv = styled.textarea`
    font-size: 1.6rem;
    width: 96%;
    resize: none;
    height: auto;
    line-height: 3rem;

`;

const CodeButton = styled.button`
    border: thin solid #D6D6D6;
    width: 4rem;
    height: 3rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
`;

export default function TaskCodeViewComponent(props: TaskCodeProps) {
    const code = props.code;
    return <CodeBox>
                {props.handleCode ? (
                    <AnswerDiv value={code} />
                ) : null}
            
            <CodeButton onClick={props.handleButton}>
                {props.handleCode ? (
                    <HiOutlineChevronUp size="1.5rem" />
                ) : (
                    <HiOutlineChevronDown size="1.5rem" />
                )}
            </CodeButton>
        </CodeBox>
}
