import React from 'react';
import styled from 'styled-components';
import {
    SubTaskDiv,
    SubTaskTextDiv,
    TextTitleContainer,
    TextBodyContainer,
} from '../styles/SubTaskComponent.styles';
interface SubTaskProps {
    title: string[];
    description: string[];
    handleCode: boolean;
}

export default function SubTaskComponent(props: SubTaskProps) {
    return (
        <SubTaskDiv>
            <SubTaskTextDiv isCode={props.handleCode}>
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
