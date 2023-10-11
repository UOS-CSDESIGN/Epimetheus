import React, { useState } from 'react';
import LogoComponent from '../components/LogoComponent';
import SubTaskComponent from '../components/SubTaskComponent';
import styled from 'styled-components';

const TaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 4.5vh;
    margin-left: 4.8vw;
    margin-right: 4.8vw;
    margin-bottom: 4.5vh;
    width: 90vw;
    height: 90vh;
    border-radius: 20px;
    background-color: #f0f0f0;
`;

const SubTaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 85vw;
    height: 72vh;
    margin-top: 3.4vh;
    margin-left: 2.7vw;
    margin-right: 2.7vw;
    margin-bottom: 14.7vh;
    border-radius: 20px;
    overflow: auto;
    align-items: center;
    background-color: #fff;
`;

export default function ConsolePage() {
    const [text, setText] = useState<string>('');
    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    const showCode = () => {
        alert('안녕?');
    };
    return (
        <TaskDiv>
            <SubTaskDiv>
                <LogoComponent />
                <SubTaskComponent
                    text={text}
                    onChangeText={handleText}
                    handleButton={showCode}
                />
            </SubTaskDiv>
        </TaskDiv>
    );
}
