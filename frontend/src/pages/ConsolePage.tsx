import React, { useContext, useEffect, useState } from 'react';
import LogoComponent from '../components/LogoComponent';
import SubTaskComponent from '../components/SubTaskComponent';
import TaskInputComponents from '../components/TaskInputComponents';
import TaskCodeViewComponent from '../components/TaskCodeViewComponent';
import IntroComponent from '../components/IntroComponent';
import { GetData } from '../api/GetData';
import { TaskDiv, SubTasksDiv, SubTaskDiv } from '../styles/ConsolePage.styles';

import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { StateContext } from '../App';

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
                setIsLoading((prevState : any) => {
                    const newLoading = {
                        ...prevState,
                        [data.stepId] : true,
                    };
                    return newLoading;
                })
                break;
            case 'code':
                setCode((prevState: any) => {
                    const newCode = { ...prevState, [data.stepId]: data.code };
                    return newCode;
                });
                setOpenCode((prevState: any) => {
                    const newOpenCode = {
                        ...prevState,
                        [data.stepId]: false,
                    };
                    return newOpenCode;
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
                setIsLoading((prevState : any) => {
                    const newLoading = {
                        ...prevState,
                        [data.stepId] : false,
                    };
                    return newLoading;
                })
                break;
        }
    };

    const showCode = (stepId: string) => {
        setOpenCode((prevState: any) => ({
            ...prevState,
            [stepId]: !prevState[stepId],
        }));
    };

    const onSubmit = async (text: string) => {
        await GetData(text, handleData);
        setInputText('');
    };

    const onVoice = () => {
        console.log('Voice');
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
                            isLoading = {isLoading[stepId]}
                            title={title[stepId]}
                            description={description[stepId]}
                            handleCode={openCode[stepId]}
                        />
                        <TaskCodeViewComponent
                            handleButton={() => showCode(stepId)}
                            handleCode={openCode[stepId]}
                            code={code[stepId]}
                        />
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
