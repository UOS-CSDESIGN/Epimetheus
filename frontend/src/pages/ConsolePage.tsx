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
import CodeActionComponent from '../components/CodeActionComponent';
import TaskViewComponent from '../components/TaskViewComponent';
import {
    handleIntroduction,
    handleConclusion,
    handleTitle,
    handleDescription,
    handleCode,
} from '../controller/StateController';
import { showCode } from '../controller/StateController';

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

    const handleData = (data: any) => {
        switch (data.property) {
            case 'introduction':
                handleIntroduction(
                    data,
                    setIntroduction,
                    setIsIntroduction,
                    taskNo,
                );
                break;
            case 'conclusion':
                handleConclusion(data, setConclusion, setIsConclusion, taskNo);
                break;
            case 'title':
                handleTitle(data, setTitle, setIsLoading, taskNo);
                break;
            case 'description':
                handleDescription(data, setDescription, setIsLoading, taskNo);
                break;
            case 'code':
                handleCode(data, setOpenCode, taskNo);
                break;
        }
    };

    const handleSubmit = async (inputText: string) => {
        await GetData(inputText, handleData).then(() => {
            setTaskNo(prevTaskNo => prevTaskNo + 1);
        });
        setTask(prevState => ({
            ...prevState,
            [taskNo.toString()]: inputText,
        }));
        handleStates((taskNo + 1).toString());
    };

    const handleStates = (taskNo: string) => {
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
            {Object.values(task).some(Boolean) ? null : <LogoComponent />}
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
                                            showCode(
                                                Number(taskNo),
                                                stepNo,
                                                setOpenCode,
                                            )
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
                        {isConclusion?.[taskNo] ? (
                            <CodeActionComponent
                                isConclusion={isConclusion?.[taskNo]}
                                title={title[taskNo]}
                                setCode={setCode}
                                taskNo={taskNo}
                            />
                        ) : null}
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
