import React, { useEffect, useState } from 'react';
import LogoComponent from '../components/LogoComponent';
import SubTaskComponent from '../components/SubTaskComponent';
import styled from 'styled-components';
import TaskInputComponents from '../components/TaskInputComponents';
import TaskCodeViewComponent from '../components/TaskCodeViewComponent';
import IntroComponent from '../components/IntroComponent';

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

const SubTasksDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 85vw;
    height: 72vh;
    margin-top: 3.4vh;
    margin-left: 2.7vw;
    margin-right: 2.7vw;
    margin-bottom: 6vh;
    border-radius: 20px;
    overflow: auto;
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
    const [introduction, setIntroduction] = useState<string>(
        'Do you want to create a basic calculator in Javasciprt?',
    );
    const [isIntroduction, setIsIntroduction] = useState<boolean>(false);
    const [conclusion, setConclusion] = useState<string>(
        'With these steps, you can create a basic calculator in Javascript that allows users to perform addition, subtraction, multiplication, and diviosn operations!',
    );
    const [isConclusion, setIsConclusion] = useState<boolean>(false);
    const [text, setText] = useState<{ [stepId: string]: string[] }>({
        '1': [
            'Create a function for each operation (e.g., addition, substraction, multiplication, division).',
        ],
        '2': [
            'Create a select element to allow the user to choose the operation they want to perform.',
        ],
    });
    const [openCode, setOpenCode] = useState<{ [stepId: string]: boolean }>({
        '1': true,
        '2': true,
    });
    const [code, setCode] = useState<{ [stepId: string]: string[] }>({
        '1': [
            '#include <iostream>',
            '#include <string>',
            '#include <vector>',
            'using namespace std;',
            'int main(){',
            'int n;',
            'cin >> n;',
            'cout << n << endl;',
            '}',
        ],
        '2': [
            '#include <iostream>',
            '#include <string>',
            '#include <vector>',
            'using namespace std;',
            'int main(){',
            'int n;',
            'cin >> n;',
            'cout << n << endl;',
            '}',
        ],
    });

    const handleText = (
        e: React.ChangeEvent<HTMLTextAreaElement>,
        stepId: string,
    ) => {
        setText(prevState => {
            const newText = { ...prevState, [stepId]: [e.target.value] };
            return newText;
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
    return (
        <TaskDiv>
            <SubTasksDiv>
                <LogoComponent />
                {isIntroduction ? (
                    <IntroComponent intro={introduction} />
                ) : null}
                {Object.keys(text).map(stepId => (
                    <SubTaskDiv key={stepId}>
                        <SubTaskComponent
                            text={text[stepId]}
                            onChangeText={e => handleText(e, stepId)}
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
            <TaskInputComponents />
        </TaskDiv>
    );
}
