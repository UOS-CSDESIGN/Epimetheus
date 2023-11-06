import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext } from 'react';
import { GlobalStyle } from './styles/GlobalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CodeInputPage from './pages/CodeInputPage';

const AppDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ffffff;
`;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});
interface StateContextType {
    isLoading: any;
    setIsLoading: any;
    inputText: string;
    setInputText: any;
    introduction: string;
    setIntroduction: any;
    isIntroduction: boolean;
    setIsIntroduction: any;
    conclusion: string;
    setConclusion: any;
    isConclusion: boolean;
    setIsConclusion: any;
    title: { [stepId: string]: string[] };
    setTitle: any;
    description: { [stepId: string]: string[] };
    setDescription: any;
    openCode: { [stepId: string]: boolean };
    setOpenCode: any;
    code: { [stepId: string]: string[] };
    setCode: any;
}

export const StateContext = createContext<StateContextType>({
    isLoading: false,
    setIsLoading: () => {},
    inputText: '',
    setInputText: () => {},
    introduction: '',
    setIntroduction: () => {},
    isIntroduction: false,
    setIsIntroduction: () => {},
    conclusion: '',
    setConclusion: () => {},
    isConclusion: false,
    setIsConclusion: () => {},
    title: {},
    setTitle: () => {},
    description: {},
    setDescription: () => {},
    openCode: {},
    setOpenCode: () => {},
    code: {},
    setCode: () => {},
});

export default function App() {
    const [isLoading, setIsLoading] = useState<{ [stepId: string]: boolean }>(
        {},
    );
    const [inputText, setInputText] = useState<string>('');
    const [introduction, setIntroduction] = useState<string>('');
    const [isIntroduction, setIsIntroduction] = useState<boolean>(false);
    const [conclusion, setConclusion] = useState<string>('');
    const [isConclusion, setIsConclusion] = useState<boolean>(false);
    const [title, setTitle] = useState<{ [stepId: string]: string[] }>({});
    const [description, setDescription] = useState<{
        [stepId: string]: string[];
    }>({});
    const [openCode, setOpenCode] = useState<{ [stepId: string]: boolean }>({
        [0]: false,
    });
    const [code, setCode] = useState<{ [stepId: string]: string[] }>({});

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
            }}
        >
            <QueryClientProvider client={queryClient}>
                <GlobalStyle />
                <BrowserRouter>
                    <AppDiv>
                        <Routes>
                            <Route path="/" element={<ConsolePage />} />
                            <Route path="/code" element={<CodeInputPage />} />
                        </Routes>
                    </AppDiv>
                </BrowserRouter>
            </QueryClientProvider>
        </StateContext.Provider>
    );
}
