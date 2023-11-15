import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodeInputPage from './pages/CodeInputPage';
import ConsolePage from './pages/ConsolePage';
import { StateContext } from './StateContext';

const AppDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 90vh;
    background-color: #ffffff;
`;

export default function App() {
    const [isLoading, setIsLoading] = useState<{ [stepNo: string]: boolean }>(
        {},
    );
    const [inputText, setInputText] = useState<string>('');
    const [introduction, setIntroduction] = useState<string>('');
    const [isIntroduction, setIsIntroduction] = useState<boolean>(false);
    const [conclusion, setConclusion] = useState<string>('');
    const [isConclusion, setIsConclusion] = useState<boolean>(false);
    const [title, setTitle] = useState<{ [stepNo: string]: string }>({});
    const [description, setDescription] = useState<{
        [stepNo: string]: string;
    }>({});
    const [openCode, setOpenCode] = useState<{ [stepNo: string]: boolean }>({});
    const [code, setCode] = useState<{ [stepNo: string]: string }>({});
    const [execCode, setExec] = useState<string[]>([]);
    return (
        <StateContext.Provider
            value={{
                isLoading,
                setIsLoading,
                inputText,
                setInputText,
                introduction,
                setIntroduction,
                isIntroduction,
                setIsIntroduction,
                conclusion,
                setConclusion,
                isConclusion,
                setIsConclusion,
                title,
                setTitle,
                description,
                setDescription,
                openCode,
                setOpenCode,
                code,
                setCode,
                execCode,
                setExec,
            }}
        >
            <GlobalStyle />
            <BrowserRouter>
                <AppDiv>
                    <Routes>
                        <Route path="/" element={<ConsolePage />} />
                        <Route path="/code" element={<CodeInputPage />} />
                    </Routes>
                </AppDiv>
            </BrowserRouter>
        </StateContext.Provider>
    );
}
