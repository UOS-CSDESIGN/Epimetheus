import React, { useContext, useEffect, useRef, useState } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; // Example style, you can use another
import { StateContext } from '../StateContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { codeType } from '../api/codeReg/codeType';
import PostCode from '../api/codeReg/PostCode';
import { SubmitButton, SubtaskDiv } from '../styles/CodeInputPage.styles';
import { FaCheck } from 'react-icons/fa';
import { CodeEditDiv, StyledEditor } from '../styles/CodeEditPage.styles';
import SubTaskComponent from '../components/SubTaskComponent';

export default function CodeEditPage() {
    const navigate = useNavigate();
    const { isLoading, title, description, code } = useContext(StateContext);
    const [codeText, setCodeText] = useState<string>('');
    const [searchParams] = useSearchParams();
    const targetRef = useRef<number>(0);
    const taskId = useRef<string>(' ');
    const subTaskId = useRef<string>(' ');
    if (searchParams.get('task') === null) {
        taskId.current = ' ';
    } else {
        taskId.current = searchParams.get('task') as string;
    }

    if (searchParams.get('subtask') === null) {
        subTaskId.current = '';
    } else {
        subTaskId.current = searchParams.get('subtask') as string;
    }

    useEffect(() => {
        setCodeText(code[taskId.current][subTaskId.current]);
    }, []);

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let str: string = '';
        const data: codeType = {
            title: str,
            code: codeText,
            language: 'javascript',
        };
        PostCode(data)
            .then(res => {
                console.log(res);
                alert('Code is Saved Successfully!');
                navigate(-1);
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong.');
            });
    };

    return (
        <CodeEditDiv>
            <SubtaskDiv>
                <SubTaskComponent
                    title={title?.[taskId.current]?.[subTaskId.current]}
                    description={description[taskId.current][subTaskId.current]}
                    isLoading={isLoading[taskId.current][subTaskId.current]}
                    handleCode={true}
                />
            </SubtaskDiv>
            <StyledEditor
                value={codeText}
                onValueChange={code => setCodeText(code)}
                highlight={code => highlight(code, languages.js, 'js')}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 13,
                }}
            />
            <SubmitButton onClick={onSubmit}>
                <FaCheck />
            </SubmitButton>
        </CodeEditDiv>
    );
}
