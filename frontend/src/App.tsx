import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { GlobalStyle } from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodeInputPage from './pages/CodeInputPage';
import ConsolePage from './pages/ConsolePage';
import { StateContext } from './StateContext';
import { TitleState, LoadingState, CodeState } from './StateContextType';

const AppDiv = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 90vh;
    background-color: #ffffff;
`;

export default function App() {
    const [taskNo, setTaskNo] = useState<number>(0);
    const [task, setTask] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState<LoadingState>({});
    const [inputText, setInputText] = useState<string>('');
    const [introduction, setIntroduction] = useState<Record<string, string>>(
        {},
    );
    const [isIntroduction, setIsIntroduction] = useState<
        Record<string, boolean>
    >({});
    const [conclusion, setConclusion] = useState<Record<string, string>>({});
    const [isConclusion, setIsConclusion] = useState<Record<string, boolean>>(
        {},
    );
    const [title, setTitle] = useState<TitleState>({});
    const [description, setDescription] = useState<TitleState>({});
    const [openCode, setOpenCode] = useState<LoadingState>({});
    const [code, setCode] = useState<CodeState>({});
    const [execCode, setExec] = useState<string[]>([]);

    return (
        <StateContext.Provider
            value={{
                taskNo,
                setTaskNo,
                task,
                setTask,
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
