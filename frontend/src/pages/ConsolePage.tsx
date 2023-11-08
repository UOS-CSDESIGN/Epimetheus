import { useContext, useEffect } from 'react';
import LogoComponent from '../components/LogoComponent';
import SubTaskComponent from '../components/SubTaskComponent';
import TaskInputComponents from '../components/TaskInputComponent';
import TaskCodeViewComponent from '../components/TaskCodeViewComponent';
import IntroComponent from '../components/IntroComponent';
import { GetData } from '../api/GetData';
import { TaskDiv, SubTasksDiv, SubTaskDiv } from '../styles/ConsolePage.styles';
import { useNavigate } from 'react-router';

import {
    QueryClient,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { StateContext } from '../App';
import GetCode from '../api/codeReg/GetCode';

export default function ConsolePage() {
    useEffect(() => {
        console.log(process.env.REACT_APP_base_url);
    }, []);
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

    const navigate = useNavigate();

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
                setIsLoading((prevState: any) => {
                    const newLoading = {
                        ...prevState,
                        [data.stepId]: true,
                    };
                    return newLoading;
                });
                break;
            case 'code':
                // setCode((prevState: any) => {
                //     const newCode = { ...prevState, [data.stepId]: data.code };
                //     return newCode;
                // });
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
                setIsLoading((prevState: any) => {
                    const newLoading = {
                        ...prevState,
                        [data.stepId]: false,
                    };
                    return newLoading;
                });
                break;
        }
    };

    const showCode = async (stepId: string) => {
        const codeBlock = await GetCode(title[stepId]);
        console.log(code);
        setCode((prevState: any) => {
            const newCode = { ...prevState, [stepId]: codeBlock.code };
            return newCode;
        });
        setOpenCode((prevState: any) => ({
            ...prevState,
            [stepId]: !prevState[stepId],
        }));
    };

    const onSubmit = async (text: string) => {
        await GetData(text, handleData);
        setIsLoading(false);
        setInputText('');
        setIntroduction('');
        setIsIntroduction(false);
        setConclusion('');
        setIsConclusion(false);
        setTitle({});
        setDescription({});
        setOpenCode({});
        setCode({});

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
                            isLoading={isLoading[stepId]}
                            title={title[stepId]}
                            description={description[stepId]}
                            handleCode={false}
                        />
                        <TaskCodeViewComponent
                            stepId={stepId}
                            code={code[stepId]}
                            handleButton={() => showCode(stepId)}
                            handleCode={openCode[stepId]}
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
