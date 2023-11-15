import { useContext, useEffect } from 'react';
import LogoComponent from '../components/LogoComponent';
import SubTaskComponent from '../components/SubTaskComponent';
import TaskInputComponents from '../components/TaskInputComponent';
import TaskCodeViewComponent from '../components/TaskCodeViewComponent';
import IntroComponent from '../components/IntroComponent';
import { GetData } from '../api/GetData';
import { TaskDiv, SubTasksDiv, SubTaskDiv } from '../styles/ConsolePage.styles';
import { StateContext } from '../StateContext';
import GetCode from '../api/codeReg/GetCode';
import CodeActionComponent from '../components/CodeActionComponent';

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
        execCode,
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
        setExec,
    } = useContext(StateContext);

    useEffect(()=>{
        console.log("isConclusion", isConclusion);
        if(isConclusion === true) {
            Object.keys(title).map(async (stepNo:string) => {
                const codeBlock = await GetCode(title[stepNo]);
                setExec((prev: string[])=>{
                    const newExecs = [...prev, codeBlock.code];
                    return newExecs;
                });
            })
            execCode.map((item)=>{
                console.log("after conclusion");
                console.log(item);
            })
        }
    },[isConclusion]);
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
                        [data.stepNo]: data.title,
                    };
                    return newTitle;
                });
                setIsLoading((prevState: any) => {
                    const newLoading = {
                        ...prevState,
                        [data.stepNo]: true,
                    };
                    return newLoading;
                });
                break;
            case 'code':
                setOpenCode((prevState: any) => {
                    const newOpenCode = {
                        ...prevState,
                        [data.stepNo]: false,
                    };
                    return newOpenCode;
                });
                break;
            case 'description':
                setDescription((prevState: any) => {
                    const newDescription = {
                        ...prevState,
                        [data.stepNo]: data.description,
                    };
                    return newDescription;
                });
                setIsLoading((prevState: any) => {
                    const newLoading = {
                        ...prevState,
                        [data.stepNo]: false,
                    };
                    return newLoading;
                });
                break;
        }
    };

    const showCode = async (stepNo: string) => {
        
        const codeBlock = await GetCode(title[stepNo]);
        setCode((prevState: any) => {
            const newCode = { ...prevState, [stepNo]: codeBlock.code };
            return newCode;
        });
        setOpenCode((prevState: any) => ({
            ...prevState,
            [stepNo]: !prevState[stepNo],
        }));
    };

    const onSubmit = async (text: string) => {
        setIntroduction('');
        setIsIntroduction(false);
        setConclusion('');
        setIsConclusion(false);
        setTitle({});
        setIsLoading({});
        setDescription({});
        setOpenCode({});
        setCode({});
        await GetData(text, handleData);
        setIsLoading({});
        setInputText('');
        setIntroduction('');
        setIsIntroduction(false);
        setConclusion('');
        setIsConclusion(false);
        setTitle({});
        setDescription({});
        setOpenCode({});
        setCode({});
        setExec([]);
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
                {Object.keys(title).map(stepNo => (
                    <SubTaskDiv key={stepNo}>
                        <SubTaskComponent
                            isLoading={isLoading[stepNo]}
                            title={title[stepNo]}
                            description={description[stepNo]}
                            handleCode={false}
                        />
                        <TaskCodeViewComponent
                            stepNo={stepNo}
                            code={code[stepNo]}
                            handleButton={() => showCode(stepNo)}
                            handleCode={openCode[stepNo]}
                        />
                    </SubTaskDiv>
                ))}
                {isConclusion ? <IntroComponent intro={conclusion} /> : null}
            </SubTasksDiv>
            {!isConclusion ? <CodeActionComponent codes={execCode}/> : null}
            <TaskInputComponents
                inputText={inputText}
                setText={setInputText}
                onSubmit={onSubmit}
                onVoice={onVoice}
            />
        </TaskDiv>
    );
}