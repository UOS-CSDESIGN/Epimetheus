import { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { StateContext } from '../App';

const CodeEditor = styled.div`
    width: 80vw;
    min-height: 70vh;
    max-height: auto;
    overflow: inherit;
    position: relative;
    border-radius: 20px;
    font-size: 1rem;
    margin: 0;
`;
const CodeInput = styled.textarea`
    position: absolute;
    margin-top: 0vh;
    margin-right: 0vw;
    margin-bottom: 2.7%;
    margin-left: 2vw;
    padding: 0;
    width: 100%;
    min-height: 80vh;
    max-height: auto;
    border-radius: 0.25rem;
    caret-color: $alert;
    color: transparent;
    background-color: transparent;
    z-index: 1;
    border: none;
    resize: none;
    overflow: hidden;
    &:focus {
        outline: none;
    }
`;
const Present = styled.pre`
    background-color: #fff;
    width: 76vw;

    min-height: 70vh;
    max-height: auto;

    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 0;

    padding-bottom: 2vh;
    padding-top: 0vh;
    padding-left: 2vw;
    padding-right: 2vw;

    border: none;
    border-radius: 20px;

    overflow-y: inherit;
    overflow-x: inherit;
    text-overflow: ellipsis;

    color: #000000;
    z-index: 0;
`;

export interface CodeInputProps {
    language: string;
}
export default function CodeInputComponent(props: CodeInputProps) {
    const { code } = useContext(StateContext);

    const [highlighted, setHighlighted] = useState('');
    const [codeText, setCodeText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        //bring code
        //bring tasks
    }, []);

    useEffect(() => {
        setHighlighted(
            hljs
                .highlight(codeText, { language: props.language })
                .value.replace(/" "/g, '&nbsp; '),
        );
    }, [codeText]);
    const handleIndent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            setCodeText(codeText + '    ');
        }
    };
    const onTabPress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        if (e.target.value === '\t') {
            setCodeText(codeText + '    ');
        } else setCodeText(e.target.value);
    };
    const createMarkup = (code: string): { __html: string } => ({
        __html: code,
    });
    return (
        <>
            <CodeEditor>
                <CodeInput
                    value={codeText}
                    onKeyDown={handleIndent}
                    onChange={onTabPress}
                    autoComplete="false"
                    spellCheck="false"
                />
                <Present>
                    <code
                        dangerouslySetInnerHTML={createMarkup(highlighted)}
                    ></code>
                </Present>
            </CodeEditor>
        </>
    );
}
