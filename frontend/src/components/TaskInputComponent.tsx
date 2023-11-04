import React, { useState } from 'react';
import { HiMicrophone } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const TaskInputDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90%;
    min-height: 6vh;
    height: 15%;
    margin-top: 1%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 2%;
    padding-right: 1%;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
    border-radius: 2rem;
    background-color: #ffffff;
`;
const TaskInput = styled(TextareaAutosize)`
    display: flex;
    background-color: #ffffff;
    border-radius: 2rem;
    padding: 2%;
    padding-top: 1%;
    padding-bottom: 1%;
    width: 100%;
    height: 100%;
    resize: none;
    border: none;
    color: black;
    font-size: 2rem;
    font-family: Inter;
    font-weight: 400;
    outline: 0;
`;
const ActionButtons = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e0e0e0;
    background-color: #ffff;
    border: none;
    font-size: 2rem;
    color: black;
    padding: 1%;
    margin-left: 1%;
`;

interface TaskInputProps {
    inputText: string;
    setText: (text: string) => void;
    onSubmit: (text: string) => void;
    onVoice: () => void;
}

export default function TaskInputComponent(props: TaskInputProps) {
    const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setText(e.target.value);
    };
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onSubmit(props.inputText);
    };
    const handleOnKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.onSubmit(props.inputText);
        }
    };

    return (
        <>
            <TaskInputDiv>
                <TaskInput
                    onChange={e => onChangeInput(e)}
                    value={props.inputText}
                    minRows={1}
                    onKeyDown={handleOnKeyPress}
                />
                <ActionButtons onClick={props.onVoice}>
                    <HiMicrophone />
                </ActionButtons>
                <ActionButtons onClick={handleSubmit}>
                    <FiSend />
                </ActionButtons>
            </TaskInputDiv>
        </>
    );
}
