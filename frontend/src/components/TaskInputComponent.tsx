import React, { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import AudioRecordComponent from './AudioRecordComponent';
import {
    TaskInputDiv,
    TaskInput,
    ActionButtons,
} from '../styles/TaskInputComponent.styles';

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
                <AudioRecordComponent onSubmit={props.onSubmit} />
                <ActionButtons onClick={handleSubmit}>
                    <FiSend />
                </ActionButtons>
            </TaskInputDiv>
        </>
    );
}