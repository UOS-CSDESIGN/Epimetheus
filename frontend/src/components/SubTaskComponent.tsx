import React from 'react';
import styled from 'styled-components';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

interface SubTaskProps {
    text: string[];
    onChangeText: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleButton: () => void;
    handleCode: boolean;
}

const SubTaskTextDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    border-radius: 20px;
    width: 80vw;
    height: auto;
    margin-left: 4rem;
    margin-right: 4rem;
    margin-top: 2rem;
    flex-shrink: 0;
    background-color: #fff;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
`;

const TextContainer = styled.textarea`
    display: flex;
    width: 72vw;
    height: auto;
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
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
    vertical-align: center;
`;

const CodeButton = styled.button`
    border: 0;
    margin-left: 1vw;
    width: 5vw;
    height: 5vh;
    border-radius: 20px;
`;

export default function SubTaskComponent(props: SubTaskProps) {
    return (
        <SubTaskTextDiv>
            <TextContainer
                value={props.text}
                onChange={props.onChangeText}
                placeholder="Hello"
                data-testid="text-container"
            ></TextContainer>
            <CodeButton onClick={props.handleButton} data-testid="code-button">
                {props.handleCode ? (
                    <HiOutlineChevronUp size="20" />
                ) : (
                    <HiOutlineChevronDown size="20" />
                )}
            </CodeButton>
        </SubTaskTextDiv>
    );
}
