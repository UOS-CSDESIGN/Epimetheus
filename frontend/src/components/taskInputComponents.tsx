import React, { useState } from 'react';
import { HiMicrophone, HiChevronDoubleUp } from 'react-icons/hi';
import styled from 'styled-components';

const TaskInputComponent = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;

    width: 80%;
    height: 100%;

    fill: #ffff;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));

    border-radius: 20px;
    border: 1;

    background-color: #ffffff;

    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 10px;
`;
const TaskInput = styled.textarea`
    flex: 1;
    width: 90%;
    border: 0;
    color: #828282;
    font-size: 15px;
    outline: 0;
    resize: none;
`;
const ActionButtons = styled.button`
    flex: 2;

    border: 0;
    height: 100%;
    padding-top: 0px;
    padding-left: 0px;
    padding-bottom: 0px;
    padding-right: 0px;
    flex: 1;
    color: #f0f0f0;
    background-color: #ffff;
    font-size: 25px;
`;

export default function TaskInputComponents() {
    const [inputText, setText] = useState('');
    const eventInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };

    const onSubmit = () => {
        console.log('submit');
    };
    const onVoice = () => {
        console.log('voice');
    };

    return (
        <>
            <TaskInputComponent>
                <TaskInput onChange={e => eventInput(e)} value={inputText} />
                <ActionButtons onClick={onVoice}>
                    <HiMicrophone />
                </ActionButtons>
                <ActionButtons>
                    <HiChevronDoubleUp onClick={onSubmit} />
                </ActionButtons>
            </TaskInputComponent>
        </>
    );
}
