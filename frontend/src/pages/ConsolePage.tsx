import React, { useEffect, useState } from 'react';
import LogoComponent from '../components/LogoComponent';
import SubTaskComponent from '../components/SubTaskComponent';
import styled from 'styled-components';
import TaskInputComponents from '../components/TaskInputComponents';
import TaskCodeViewComponent from '../components/TaskCodeViewComponent';

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
    const [text, setText] = useState<string>('');
    const [openCode, setOpenCode] = useState<boolean>(false);
    const [code, setCode] = useState<string[]>([
        '#include <iostream>',
        '#include <string>',
        '#include <vector>',
        'using namespace std;',
        'int main(){',
        'int n;',
        'cin >> n;',
        'cout << n << endl;',
        '}',
    ]);
    const handleText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
    };
    const showCode = () => {
        setOpenCode(!openCode);
    };

    const onChangeCode = (code: string[]) => {
        setCode(code);
    };
    return (
        <TaskDiv>
            <SubTasksDiv>
                <SubTaskDiv>
                    <LogoComponent />
                    <SubTaskComponent
                        text={text}
                        onChangeText={handleText}
                        handleButton={showCode}
                        handleCode={openCode}
                    />
                    {openCode && (
                        <TaskCodeViewComponent
                            handleChange={onChangeCode}
                            code={code}
                        />
                    )}
                </SubTaskDiv>
            </SubTasksDiv>
            <TaskInputComponents />
        </TaskDiv>
    );
}
