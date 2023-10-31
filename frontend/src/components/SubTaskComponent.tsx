import React from 'react';
import styled from 'styled-components';

interface SubTaskProps {
    title: string[];
    description: string[];
}

const SubTaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
    align-items: center;
`;
const SubTaskTextDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 1%;
    padding-right: 1%;
    border-radius: 2rem;
    width: 98%;
    height: auto;
    background-color: #fff;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
`;

const TextTitleContainer = styled.textarea`
    width: 98%;
    padding: 1%;
    padding-top: 2%;
    height: auto;
    overflow: visible;
    border: 0;
    resize: none;
    background-color: #fff;
    color: #828282;
    font-family: Inter;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.8rem;
    vertical-align: middle;
    background: transparent;
    border-bottom: solid;
    border-width: thin;
    border-color: #D6D6D6;
`;

const TextBodyContainer = styled.textarea`
    width: 98%;
    padding: 1%;
    padding-top: 2%;
    padding-bottom: 2%;
    height: auto;
    overflow: visible;
    border: 0;
    resize: none;
    background-color: #fff;
    color: #828282;
    font-family: Inter;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.8rem;
    vertical-align: middle;
    background: transparent;
`;

export default function SubTaskComponent(props: SubTaskProps) {
    return (
        <SubTaskDiv>
            <SubTaskTextDiv>
                <TextTitleContainer
                    value={props.title}
                    placeholder="Generating Step.. Please Wait"
                ></TextTitleContainer>
                <TextBodyContainer
                    value={props.description}
                    placeholder="Generating Description.. Please Wait"
                ></TextBodyContainer>
            </SubTaskTextDiv>
        </SubTaskDiv>
    );
}
