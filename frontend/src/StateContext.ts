import { SetStateAction, createContext, Dispatch } from 'react';

export interface StateContextType {
    isLoading: Record<string, boolean>;
    setIsLoading: Dispatch<SetStateAction<Record<string, boolean>>>;
    inputText: string;
    setInputText: (inputText: string) => void;
    introduction: string;
    setIntroduction: Dispatch<SetStateAction<string>>;
    isIntroduction: boolean;
    setIsIntroduction: Dispatch<SetStateAction<boolean>>;
    conclusion: string;
    setConclusion: Dispatch<SetStateAction<string>>;
    isConclusion: boolean;
    setIsConclusion: Dispatch<SetStateAction<boolean>>;
    title: Record<string, string>;
    setTitle: Dispatch<SetStateAction<Record<string, string>>>;
    description: Record<string, string>;
    setDescription: Dispatch<SetStateAction<Record<string, string>>>;
    openCode: Record<string, boolean>;
    setOpenCode: Dispatch<SetStateAction<Record<string, boolean>>>;
    code: Record<string, string>;
    setCode: Dispatch<SetStateAction<Record<string, string>>>;
}

export const StateContext = createContext<StateContextType>({
    isLoading: {},
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
