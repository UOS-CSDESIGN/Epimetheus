import { useEffect, useState } from 'react';
import styled from 'styled-components';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const CodeEditor = styled.div`
    position: relative;
    width: 100vw;
    height: 90vh;
    border-radius: 0.25rem;
`;
const CodeInput = styled.textarea`
    position: absolute;
    width: 90vw;
    height: auto;
    resize: vertical;
    border-radius: 0.25rem;
    caret-color: $alert;
    color: transparent;
    background-color: transparent;
    z-index: 1;
    border: none;
    resize: none;
    width: calc(100vw - 1em);
    height: calc(90vh - 1em);
    font-size: 1.5rem;
    overflow: hidden;
    resize: none;
    padding-top: 1.5rem;
    &:focus {
        outline: none;
    }
`;
const Present = styled.pre`
    margin_left: 10vw;
    position: absolute;
    width: 90vw;
    height: 70vh;
    border-radius: 0.25rem;
    background-color: $codeblock-color;
    color: #c9d1d9;
    z-index: 0;
    border-radius: 0.25rem;
    text-overflow: ellipsis;    
    width: calc(100vw - 1em);
    height: calc(90vh - 1em);
    font-size: 1.5rem;
`;
const SelectLang = styled.select`
    width: 5vw;
`;
export default function CodeInputComponent() {

    const[highlighted, setHighlighted] = useState("");
    const [codeText, setCodeText] = useState("");
    const [lang, setLanguage] = useState("python");
    useEffect(()=>{
        setHighlighted(
            hljs.highlight(codeText, {language: lang}).value.replace(/" "/g, "&nbsp; ")
        );
    },[codeText]);
    const handleIndent = (e:React.KeyboardEvent<HTMLTextAreaElement>)=>{
        if(e.key === 'Tab'){
            e.preventDefault();
            setCodeText(codeText + '    ');
        }
    }
    const onChange = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        e.preventDefault();
        if(e.target.value === '\t'){
            setCodeText(codeText + '    ');
        }else
            setCodeText(e.target.value);
    }
    const selectLang = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        
        setLanguage(e.target.value);
        console.log(e.target.value);
    }

    const createMarkup = (code: string):{__html: string}=>({
        __html: code,
    });
    return (
        <>
            <SelectLang name='language' onChange={selectLang} >
                <option value={'python'}>python</option>
                <option value={'javascript'}>javascript</option>
                <option value={'c'}>c</option>
                <option value={'c++'}>c++</option>
            </SelectLang>
            <CodeEditor>
            <CodeInput 
                value={codeText} 
                onKeyDown={handleIndent}
                onChange={onChange} 
                autoComplete='false'
                spellCheck='false'
            />
            <Present>
                <code dangerouslySetInnerHTML={createMarkup(highlighted)}>
                </code>
            </Present>
            </CodeEditor>
        </>
    );
}
