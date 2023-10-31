import React, { useContext, useEffect, useState } from 'react';
import LogoComponent from '../components/LogoComponent';
import SubTaskComponent from '../components/SubTaskComponent';
import styled from 'styled-components';
import TaskInputComponents from '../components/TaskInputComponents';
import TaskCodeViewComponent from '../components/TaskCodeViewComponent';
import IntroComponent from '../components/IntroComponent';
import { PostData } from '../api/PostData';
import LoadingComponent from '../components/LoadingComponent';
import { GetData } from '../api/GetData';

import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { StateContext } from '../App';

const TaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    margin-top: 4.5vh;
    margin-left: 4.8vw;
    margin-right: 4.8vw;
    margin-bottom: 4.5vh;
    width: 90vw;
    height: 90vh;
    border-radius: 20px;
    background-color: #f0f0f0;
`;

const SubTasksDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 85vw;
    height: 72vh;
    overflow: auto;
    overflow: auto;
    margin-top: 3.4vh;
    margin-left: 2.7vw;
    margin-right: 2.7vw;
    margin-bottom: 6vh;
    border-radius: 20px;
    align-items: center;
    background-color: #fff;
`;

const SubTaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 80vw;
    height: 70vh;
    align-items: center;
`;

export default function ConsolePage() {
    const {
        isLoading,
        introduction,
        isIntroduction,
        inputText,
        title,
        description,
        openCode,
        code,
        conclusion,
        isConclusion,
        setIsLoading,
        setInputText,
        setIntroduction,
        setIsIntroduction,
        setConclusion,
        setIsConclusion,
        setTitle,
        setDescription,
        setOpenCode,
        setCode,
    } = useContext(StateContext);

    const queryClient = useQueryClient();

    const handleData = (data: any) => {
        switch (data.property) {
            case 'introduction':
                setIntroduction(data.wrapper);
                setIsIntroduction(true);
                break;
            case 'conclusion':
                setConclusion(data.wrapper);
                setIsConclusion(true);
                break;
            case 'title':
                setTitle((prevState: any) => {
                    const newTitle = {
                        ...prevState,
                        [data.stepId]: data.title,
                    };
                    return newTitle;
                });
                break;
            case 'code':
                setCode((prevState: any) => {
                    const newCode = { ...prevState, [data.stepId]: data.code };
                    return newCode;
                });
                break;
            case 'description':
                setDescription((prevState: any) => {
                    const newDescription = {
                        ...prevState,
                        [data.stepId]: data.description,
                    };
                    return newDescription;
                });
                break;
        }
    };

    const showCode = (stepId: string) => {
        setOpenCode({ [stepId]: !openCode[stepId] });
    };

    const onSubmit = async (text: string) => {
        await GetData(text, handleData);
        setInputText('');
    };

    const onVoice = () => {
        console.log('voice');
    };
    return (
        <TaskDiv>
            <LogoComponent />
            <SubTasksDiv>
                {isIntroduction ? (
                    <IntroComponent intro={introduction} />
                ) : null}
                {Object.keys(title).map(stepId => (
                    <SubTaskDiv key={stepId}>
                        <SubTaskComponent
                            title={title[stepId]}
                            description={description[stepId]}
                            handleButton={() => showCode(stepId)}
                            handleCode={openCode[stepId]}
                        />
                        {openCode[stepId] == true ? (
                            <TaskCodeViewComponent code={code[stepId]} />
                        ) : null}
                    </SubTaskDiv>
                ))}
                {isConclusion ? <IntroComponent intro={conclusion} /> : null}
            </SubTasksDiv>
            <TaskInputComponents
                inputText={inputText}
                setText={setInputText}
                onSubmit={onSubmit}
                onVoice={onVoice}
            />
        </TaskDiv>
    );
}
