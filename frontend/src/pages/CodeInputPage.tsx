import React from 'react'
import CodeInputComponent, { CodeInputProps } from '../components/CodeInputComponent';
import styled from 'styled-components';
import { useState } from 'react';
import LanguageSelectComponent from '../components/LanguageSelectComponent';

const CodeInputP = styled.div`
    display: flex;
    flex-direction: column;
    allign-items: center;
    width: 100vw;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: #ffffff;
`;
const CodeInputLayer = styled.div`

    background-color: #f0f0f0;
    width: 90vw;

    min-height: 80vh;
    max-height: auto;
    
    margin-top: 5vh;
    margin-bottom: 5vh;
    margin-left: 5vw;
    margin-right: 5vw;

    padding-top: 0vh;
    padding-bottom: 0vh;
    padding-left: 0vw;
    padding-right: 0vw;

    border: none;
    border-radius: 20px;

    overflow: inherit;
    text-overflow: ellipsis;

`;
const CodeInput = styled.div`
    background-color: #ffffff;
    width: 80vw;
    min-height: 69vh;
    max-height: auto;
    
    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 1vh;
    margin-bottom: 1vh;
    border-radius: 20px;
    padding: 0;

    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
`;
export default function CodeINputPage() {

    const [lang, setLanguage] = useState<string>("python");
    
    const onSelect =(e: React.ChangeEvent<HTMLSelectElement>) =>{
        setLanguage(e.target.value);
    }
  return (
    <CodeInputP>
        <CodeInputLayer>
            <LanguageSelectComponent onChange={onSelect}/>
            <CodeInput>
                <CodeInputComponent language={lang}/>
            </CodeInput>
        </CodeInputLayer>
    </CodeInputP>
  );
}
