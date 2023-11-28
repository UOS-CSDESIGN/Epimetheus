import { useContext, useEffect } from 'react';
import LogoComponent from '../components/LogoComponent';
import SubTaskComponent from '../components/SubTaskComponent';
import TaskInputComponents from '../components/TaskInputComponent';
import TaskCodeViewComponent from '../components/TaskCodeViewComponent';
import IntroComponent from '../components/IntroComponent';
import { GetData } from '../api/GetData';
import {
    TaskDiv,
    SubTasksDiv,
    SubTaskDiv,
    TaskCoverView,
} from '../styles/ConsolePage.styles';
import { StateContext } from '../StateContext';
import GetCode from '../api/codeReg/GetCode';
import CodeActionComponent from '../components/CodeActionComponent';
import TaskViewComponent from '../components/TaskViewComponent';
import { CodeState, LoadingState } from '../StateContextType';

export default function ConsolePage() {
    const {
        taskNo,
        task,
        isLoading,
        introduction,
        isIntroduction,
        inputText,
        title,
        description,
        openCode,
        code,
        execCode,
        conclusion,
        isConclusion,
        setTaskNo,
        setTask,
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
        setExec,
    } = useContext(StateContext);

    useEffect(() => {
        if (isConclusion[taskNo] === true) {
            Object.keys(title).map(async (stepNo: string) => {
                const codeBlock = await GetCode(title[taskNo][stepNo]);
                setExec((prev: string[]) => {
                    const newExecs = [...prev, codeBlock.code];
                    return newExecs;
                });
            });
            execCode.map(item => {
                console.log('after conclusion');
                console.log(item);
            });
        }
    }, [isConclusion]);

    const handleData = (data: any) => {
        switch (data.property) {
            case 'introduction':
                setIntroduction((prevState: Record<string, string>) => {
                    const newIntroduction = {
                        ...prevState,
                        [taskNo.toString()]: data.wrapper,
                    };
                    return newIntroduction;
                });
                setIsIntroduction((prevState: Record<string, boolean>) => {
                    const newIntroduction = {
                        ...prevState,
                        [taskNo.toString()]: true,
                    };
                    return newIntroduction;
                });
                break;
            case 'conclusion':
                setConclusion((prevState: Record<string, string>) => {
                    const newConclusion = {
                        ...prevState,
                        [taskNo.toString()]: data.wrapper,
                    };
                    return newConclusion;
                });
                setIsConclusion((prevState: Record<string, boolean>) => {
                    const newIsConclusion = {
                        ...prevState,
                        [taskNo.toString()]: true,
                    };
                    return newIsConclusion;
                });
                break;
            case 'title':
                setTitle(
                    (prevState: Record<string, Record<string, string>>) => {
                        const newTitle = {
                            ...prevState,
                            [taskNo.toString()]: {
                                ...(prevState[taskNo.toString()] || {}),
                                [data.stepNo]: data.title,
                            },
                        };
                        return newTitle;
                    },
                );
                setIsLoading(
                    (prevState: Record<string, Record<string, boolean>>) => {
                        const newLoading = {
                            ...prevState,
                            [taskNo.toString()]: {
                                [data.stepNo]: true,
                            },
                        };
                        return newLoading;
                    },
                );
                break;
            case 'code':
                setOpenCode(
                    (prevState: Record<string, Record<string, boolean>>) => {
                        const newOpenCode = {
                            ...prevState,
                            [taskNo.toString()]: {
                                [data.stepNo]: true,
                            },
                        };
                        return newOpenCode;
                    },
                );
                break;
            case 'description':
                setDescription(
                    (prevState: Record<string, Record<string, string>>) => {
                        const newDescription = {
                            ...prevState,
                            [taskNo.toString()]: {
                                ...(prevState[taskNo.toString()] || {}),
                                [data.stepNo]: data.description,
                            },
                        };
                        return newDescription;
                    },
                );
                setIsLoading(
                    (prevState: Record<string, Record<string, boolean>>) => {
                        const newLoading = {
                            ...prevState,
                            [taskNo.toString()]: {
                                [data.stepNo]: false,
                            },
                        };
                        return newLoading;
                    },
                );
                break;
        }
    };

    const showCode = async (taskNo: number, stepNo: string) => {
        if (title[taskNo.toString()] && title[taskNo.toString()][stepNo]) {
            const codeBlock = await GetCode(title[taskNo.toString()][stepNo]);
            setCode((prevState: CodeState) => {
                const newCode = {
                    ...prevState,
                    [taskNo.toString()]: {
                        ...prevState[taskNo],
                        [stepNo]: codeBlock.code,
                    },
                };
                return newCode;
            });
        }
        setOpenCode((prevState: LoadingState) => ({
            ...prevState,
            [taskNo.toString()]: {
                ...prevState[taskNo],
                [stepNo]: true,
            },
        }));
    };

    const handleSubmit = async (inputText: string) => {
        await GetData(inputText, handleData).then(() => {
            setTaskNo(prevTaskNo => prevTaskNo + 1);
        });
        setTask(prevState => ({
            ...prevState,
            [taskNo.toString()]: inputText,
        }));
        resetStates((taskNo + 1).toString());
    };

    const resetStates = (taskNo: string) => {
        setIntroduction(prevState => ({ ...prevState, [taskNo]: '' }));
        setIsIntroduction(prevState => ({ ...prevState, [taskNo]: false }));
        setConclusion(prevState => ({ ...prevState, [taskNo]: '' }));
        setIsConclusion(prevState => ({ ...prevState, [taskNo]: false }));
        setTitle(prevState => ({ ...prevState, [taskNo]: {} }));
        setIsLoading(prevState => ({ ...prevState, [taskNo]: {} }));
        setDescription(prevState => ({ ...prevState, [taskNo]: {} }));
        setOpenCode(prevState => ({ ...prevState, [taskNo]: {} }));
        setCode(prevState => ({ ...prevState, [taskNo]: {} }));
        setInputText('');
    };

    const onVoice = () => {
        console.log('Voice');
    };
    return (
        <TaskDiv>
            <LogoComponent />
            <SubTasksDiv>
                {Object.entries(task).map(([taskNo, taskItem], index) => (
                    <>
                        <TaskCoverView key={index}>
                            <TaskViewComponent task={taskItem} />
                        </TaskCoverView>
                        {isIntroduction?.[taskNo] && (
                            <IntroComponent
                                intro={introduction?.[taskNo?.toString()]}
                            />
                        )}
                        {title?.[taskNo] &&
                            Object.keys(title[taskNo]).map(stepNo => (
                                <SubTaskDiv key={stepNo}>
                                    <SubTaskComponent
                                        isLoading={
                                            isLoading?.[taskNo?.toString()]?.[
                                                stepNo
                                            ]
                                        }
                                        title={
                                            title?.[taskNo?.toString()]?.[
                                                stepNo
                                            ]
                                        }
                                        description={
                                            description?.[taskNo?.toString()]?.[
                                                stepNo
                                            ]
                                        }
                                        handleCode={false}
                                    />
                                    <TaskCodeViewComponent
                                        taskNo={taskNo}
                                        stepNo={stepNo}
                                        code={
                                            code?.[taskNo?.toString()]?.[stepNo]
                                        }
                                        handleButton={() =>
                                            showCode(Number(taskNo), stepNo)
                                        }
                                        handleCode={
                                            openCode?.[taskNo?.toString()]?.[
                                                stepNo
                                            ]
                                        }
                                    />
                                </SubTaskDiv>
                            ))}
                        {isConclusion?.[taskNo] && (
                            <IntroComponent
                                intro={conclusion?.[taskNo?.toString()]}
                            />
                        )}
                        {isConclusion?.[taskNo] ? <CodeActionComponent isConclusion={isConclusion?.[taskNo]} title={title[taskNo]}/> 
                            : null}
                    </>
                ))}
            </SubTasksDiv>
            <TaskInputComponents
                inputText={inputText}
                setText={setInputText}
                onSubmit={handleSubmit}
                onVoice={onVoice}
            />
        </TaskDiv>
    );
}
