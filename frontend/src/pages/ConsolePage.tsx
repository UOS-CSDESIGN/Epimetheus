import React, { useEffect, useState } from 'react';
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
    const [isLoading, setIsLoading] = useState<boolean>();
    const [inputText, setInputText] = useState<string>('');
    const [introduction, setIntroduction] = useState<string>('');
    const [isIntroduction, setIsIntroduction] = useState<boolean>(false);
    const [conclusion, setConclusion] = useState<string>('');
    const [isConclusion, setIsConclusion] = useState<boolean>(false);
    const [title, setTitle] = useState<{ [stepId: string]: string[] }>({});
    const [description, setDescription] = useState<{
        [stepId: string]: string[];
    }>({});
    const [openCode, setOpenCode] = useState<{ [stepId: string]: boolean }>({});
    const [code, setCode] = useState<{ [stepId: string]: string[] }>({});

    const queryClient = useQueryClient();

    const handleTitle = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        stepId: string,
    ) => {
        setTitle(prevState => {
            const newText = { ...prevState, [stepId]: [e.target.value] };
            return newText;
        });
    };

    const handleDescription = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        stepId: string,
    ) => {
        setDescription(prevState => {
            const newDescription = { ...prevState, [stepId]: [e.target.value] };
            return newDescription;
        });
    };

    const showCode = (stepId: string) => {
        setOpenCode(prevState => {
            const newOpenCode = { ...prevState, [stepId]: !prevState[stepId] };
            return newOpenCode;
        });
    };

    const onChangeCode = (code: string[], stepId: string) => {
        setCode(prevState => {
            const newCode = { ...prevState, [stepId]: code };
            return newCode;
        });
    };

    const onSubmit = async (text: string) => {
        for await (const data of PostData(text)) {
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
                    setTitle(prevText => ({
                        ...prevText,
                        [data.stepId]: (prevText[data.stepId] || []).concat(
                            data.title,
                        ),
                    }));
                    break;
                case 'code':
                    setCode(prevCode => ({
                        ...prevCode,
                        [data.stepId]: (prevCode[data.stepId] || []).concat(
                            data.code,
                        ),
                    }));
                    break;
                case 'description':
                    setDescription(prevDescription => ({
                        ...prevDescription,
                        [data.stepId]: (
                            prevDescription[data.stepId] || []
                        ).concat(data.description),
                    }));
                    break;
                default:
                    break;
            }
        }
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
                            onChangeText={e => handleTitle(e, stepId)}
                            onChangeDescription={e =>
                                handleDescription(e, stepId)
                            }
                            handleButton={() => showCode(stepId)}
                            handleCode={openCode[stepId]}
                        />
                        {openCode[stepId] == true ? (
                            <TaskCodeViewComponent
                                handleChange={code =>
                                    onChangeCode(code, stepId)
                                }
                                code={code[stepId]}
                            />
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
            <button onClick={GetData}>Click me</button>
        </TaskDiv>
    );
}
