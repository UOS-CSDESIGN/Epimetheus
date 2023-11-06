import { useContext, useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { StateContext } from '../App';
import {
    CodeEditor,
    CodeInput,
    Present,
} from '../styles/CodIenputComponent.styles';

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