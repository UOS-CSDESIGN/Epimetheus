import React, { useState } from 'react';
import { HiMicrophone } from 'react-icons/hi';
import { FiSend } from 'react-icons/fi';
import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

const TaskInputComponent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 84vw;
    min-height: 5vh;
    max-height: 20vh;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));

    border-radius: 20px;

    background-color: #ffffff;
    margin-bottom: 1vh;
    padding-right: 0.5vw;
`;
const TaskInput = styled(TextareaAutosize)`
    display: flex;
    background-color: #ffffff;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    width: 73vw;
    height: 3vh;
    resize: none;
    border: none;
    color: black;
    padding-top: 1.5;
    padding-left: 2vw;
    padding-right: 2vw;
    padding-bottom: 1.5vh;
    font-size: 2rem;
    outline: 0;
`;
const ActionButtons = styled.button`
    display: flex;
    border-radius: 20px;
    align-items: center;
    border: 0;
    resize: 0;
    height: 100%;
    padding-top: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    padding-right: 0px;
    flex: 1;
    color: #e0e0e0;
    background-color: #ffff;
    font-size: 25px;
`;

interface TaskInputProps {
    inputText: string;
    setText: (text: string) => void;
    onSubmit: (text: string) => void;
    onVoice: () => void;
}

export default function TaskInputComponents(props: TaskInputProps) {
    const onChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        props.setText(e.target.value);
    };
    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        props.onSubmit(props.inputText);
    };

    return (
        <>
            <TaskInputComponent>
                <TaskInput
                    onChange={e => onChangeInput(e)}
                    value={props.inputText}
                    minRows={3}
                    maxRows={10}
                />
                <ActionButtons onClick={props.onVoice}>
                    <HiMicrophone />
                </ActionButtons>
                <ActionButtons onClick={handleSubmit}>
                    <FiSend />
                </ActionButtons>
            </TaskInputComponent>
        </>
    );
}
