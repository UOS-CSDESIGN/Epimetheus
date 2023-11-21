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
    const [lang, setLanguage] = useState<string>('python');
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const targetRef = useRef<number>(0);

    const { isLoading, title, description, code } = useContext(StateContext);

    const [serchParams] = useSearchParams();

    const stepId = useRef<string>(' ');
    const taskNo = useRef<string>(' ');
    if (serchParams.get('info') === null) {
        stepId.current = ' ';
    } else {
        stepId.current = serchParams.get('info') as string;
    }
    const [codeText, setCode] = useState<string>(code[stepId.current][0] || '');

    const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(e.target.value);
    };
    useEffect(() => {
        //bring code
        //brinng tasks
        let str: string = ' ';
        for (let i = 0; i < code[taskNo.current][stepId.current].length; i++) {
            str += code[stepId.current][i];
        }
        setCode(str);
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
        for (let i = 0; i < title[taskNo.current][stepId.current].length; i++) {
            str += title[stepId.current][i];
        }
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
                        title={title[taskNo.current][stepId.current]}
                        description={
                            description[taskNo.current][stepId.current]
                        }
                        isLoading={isLoading[taskNo.current][stepId.current]}
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
