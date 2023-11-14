import { useContext, useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';
import { StateContext } from '../StateContext';
import {
    CodeEditor,
    CodeInput,
    Present,
} from '../styles/CodIenputComponent.styles';

export interface CodeInputProps {
    language: string;
    code: string;
    setCode: (code: string) => void;
}
export default function CodeInputComponent(props: CodeInputProps) {
    const [highlighted, setHighlighted] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        //bring code
        //bring tasks
    }, []);

    useEffect(() => {
        setHighlighted(
            hljs
                .highlight(props.code, { language: props.language })
                .value.replace(/" "/g, '&nbsp; '),
        );
    }, [props.code]);
    const handleIndent = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            props.setCode(props.code + '    ');
        }
    };
    const onTabPress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        if (e.target.value === '\t') {
            props.setCode(props.code + '    ');
        } else props.setCode(e.target.value);
    };
    const createMarkup = (code: string): { __html: string } => ({
        __html: code,
    });
    return (
        <>
            <CodeEditor>
                <CodeInput
                    value={props.code}
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
