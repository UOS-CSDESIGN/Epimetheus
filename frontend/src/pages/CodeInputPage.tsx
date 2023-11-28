import React, { useContext } from 'react';
import CodeInputComponent, {
    CodeInputProps,
} from '../components/CodeInputComponent';
import { useState, useEffect, useRef } from 'react';
import LanguageSelectComponent from '../components/LanguageSelectComponent';
import { HiChevronDown } from 'react-icons/hi';
import { HiChevronDoubleRight } from 'react-icons/hi2';
import SubTaskComponent from '../components/SubTaskComponent';
import {
    CodeInputP,
    CodeInput,
    CodeInputLayer,
    SwitchButton,
    SubmitButton,
    SubtaskDiv,
} from '../styles/CodeInputPage.styles';
import { StateContext } from '../StateContext';
import { useSearchParams } from 'react-router-dom';
import PostCode from '../api/codeReg/PostCode';
import { codeType } from '../api/codeReg/codeType';

export default function CodeInputPage() {
    const [lang, setLanguage] = useState<string>('javascript');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const targetRef = useRef<number>(0);

    const { isLoading, title, description, code } = useContext(StateContext);

    const [searchParams] = useSearchParams();

    const taskId = useRef<string>(' ');
    const subTaskId = useRef<string>(' ');

    if (searchParams.get('task') === null) {
        taskId.current = ' ';
    } else {
        taskId.current = searchParams.get('task') as string;
    }

    if(searchParams.get('subtask') === null) {
        subTaskId.current = '';
    } else {
        subTaskId.current = searchParams.get('subtask') as string;
    }

    const [codeText, setCode] = useState<string>('');

    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };
    useEffect(() => {
        //bring code
        //brinng tasks
        setCode(code[taskId.current][subTaskId.current]);
        const timer = setInterval(() => {
            window.addEventListener('scroll', handleScroll);
        }, 1000);
        return () => {
            clearInterval(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if (window.scrollY > targetRef.current) {
            setIsVisible(false);
        } else {
            setIsVisible(true);
        }
        targetRef.current = window.scrollY;
    };
    const toBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
    };

    const onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let str: string = '';
        const data: codeType = {
            title: str,
            language: lang,
            code: codeText,
        };
        PostCode(data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
    return (
        <CodeInputP>
            <SwitchButton
                isVisible={isVisible}
                position={targetRef.current}
                onClick={toBottom}
            >
                <HiChevronDown />
            </SwitchButton>
            <CodeInputLayer>
                <SubtaskDiv>
                    <SubTaskComponent
                        title={title?.[taskId.current]?.[subTaskId.current]}
                        description={
                            description[taskId.current][subTaskId.current]
                        }
                        isLoading={isLoading[taskId.current][subTaskId.current]}
                        handleCode={true}
                    />
                </SubtaskDiv>
                <LanguageSelectComponent onChange={onSelect} />
                <CodeInput>
                    <CodeInputComponent
                        language={lang}
                        code={codeText}
                        setCode={setCode}
                    />
                </CodeInput>
                <SubmitButton onClick={onSubmit}>
                    <HiChevronDoubleRight />
                </SubmitButton>
            </CodeInputLayer>
        </CodeInputP>
    );
}
