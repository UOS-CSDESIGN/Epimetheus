import React from 'react';
import {
    SubTaskDiv,
    SubTaskTextDiv,
    TextTitleContainer,
    TextBodyContainer,
} from '../styles/SubTaskComponent.styles';
import LoadingComponent from './LoadingComponent';
interface SubTaskProps {
    title: string[];
    isLoading: boolean;
    description: string[];
    handleCode: boolean;
}

export default function SubTaskComponent(props: SubTaskProps) {
    return (
        <SubTaskDiv>
            <SubTaskTextDiv isCode={props.handleCode}>
                <TextTitleContainer>{props.title}</TextTitleContainer>
                {props.isLoading ? (
                    <LoadingComponent />
                ) : (
                    <TextBodyContainer>{props.description}</TextBodyContainer>
                )}
            </SubTaskTextDiv>
        </SubTaskDiv>
    );
}
