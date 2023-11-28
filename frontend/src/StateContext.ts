import { SetStateAction, createContext, Dispatch } from 'react';

export interface StateContextType {
    taskNo: number;
    setTaskNo: Dispatch<SetStateAction<number>>;
    task: Record<string, string>;
    setTask: Dispatch<SetStateAction<Record<string, string>>>;
    isLoading: Record<string, Record<string, boolean>>;
    setIsLoading: Dispatch<
        SetStateAction<Record<string, Record<string, boolean>>>
    >;
    inputText: string;
    setInputText: Dispatch<SetStateAction<string>>;
    introduction: Record<string, string>;
    setIntroduction: Dispatch<SetStateAction<Record<string, string>>>;
    isIntroduction: Record<string, boolean>;
    setIsIntroduction: Dispatch<SetStateAction<Record<string, boolean>>>;
    conclusion: Record<string, string>;
    setConclusion: Dispatch<SetStateAction<Record<string, string>>>;
    isConclusion: Record<string, boolean>;
    setIsConclusion: Dispatch<SetStateAction<Record<string, boolean>>>;
    title: Record<string, Record<string, string>>;
    setTitle: Dispatch<SetStateAction<Record<string, Record<string, string>>>>;
    description: Record<string, Record<string, string>>;
    setDescription: Dispatch<
        SetStateAction<Record<string, Record<string, string>>>
    >;
    openCode: Record<string, Record<string, boolean>>;
    setOpenCode: Dispatch<
        SetStateAction<Record<string, Record<string, boolean>>>
    >;
    code: Record<string, Record<string, string>>;
    setCode: Dispatch<SetStateAction<Record<string, Record<string, string>>>>;
    execCode: string[];
    setExec: Dispatch<SetStateAction<string[]>>;
}

export const StateContext = createContext<StateContextType>({
    task: {},
    setTaskNo: () => {},
    taskNo: 1,
    setTask: () => {},
    isLoading: {},
    setIsLoading: () => {},
    inputText: '',
    setInputText: () => {},
    introduction: {},
    setIntroduction: () => {},
    isIntroduction: {},
    setIsIntroduction: () => {},
    conclusion: {},
    setConclusion: () => {},
    isConclusion: {},
    setIsConclusion: () => {},
    title: {},
    setTitle: () => {},
    description: {},
    setDescription: () => {},
    openCode: {},
    setOpenCode: () => {},
    code: {},
    setCode: () => {},
    execCode: [],
    setExec: () => {},
});
