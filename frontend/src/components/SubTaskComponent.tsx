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
}

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
