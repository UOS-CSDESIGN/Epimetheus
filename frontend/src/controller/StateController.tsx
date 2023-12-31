import { LoadingState } from '../StateContextType';

export function handleIntroduction(
    data: any,
    setIntroduction: Function,
    setIsIntroduction: Function,
    taskNo: number,
) {
    setIntroduction((prevState: Record<string, string>) => {
        const newIntroduction = {
            ...prevState,
            [taskNo.toString()]: data.wrapper,
        };
        return newIntroduction;
    });
    setIsIntroduction((prevState: Record<string, boolean>) => {
        const newIntroduction = {
            ...prevState,
            [taskNo.toString()]: true,
        };
        return newIntroduction;
    });
}

export function handleConclusion(
    data: any,
    setConclusion: Function,
    setIsConclusion: Function,
    taskNo: number,
) {
    setConclusion((prevState: Record<string, string>) => {
        const newConclusion = {
            ...prevState,
            [taskNo.toString()]: data.wrapper,
        };
        return newConclusion;
    });
    setIsConclusion((prevState: Record<string, boolean>) => {
        const newIsConclusion = {
            ...prevState,
            [taskNo.toString()]: true,
        };
        return newIsConclusion;
    });
}

export function handleTitle(
    data: any,
    setTitle: Function,
    setIsLoading: Function,
    taskNo: number,
) {
    setTitle((prevState: Record<string, Record<string, string>>) => {
        const newTitle = {
            ...prevState,
            [taskNo.toString()]: {
                ...(prevState[taskNo.toString()] || {}),
                [data.stepNo]: data.title,
            },
        };
        return newTitle;
    });
    setIsLoading((prevState: Record<string, Record<string, boolean>>) => {
        const newLoading = {
            ...prevState,
            [taskNo.toString()]: {
                [data.stepNo]: true,
            },
        };
        return newLoading;
    });
}

export function handleDescription(
    data: any,
    setDescription: Function,
    setIsLoading: Function,
    taskNo: number,
) {
    setDescription((prevState: Record<string, Record<string, string>>) => {
        const newDescription = {
            ...prevState,
            [taskNo.toString()]: {
                ...(prevState[taskNo.toString()] || {}),
                [data.stepNo]: data.description,
            },
        };
        return newDescription;
    });
    setIsLoading((prevState: Record<string, Record<string, boolean>>) => {
        const newLoading = {
            ...prevState,
            [taskNo.toString()]: {
                [data.stepNo]: false,
            },
        };
        return newLoading;
    });
}

export function handleCode(data: any, setOpenCode: Function, taskNo: number) {
    setOpenCode((prevState: Record<string, Record<string, boolean>>) => {
        const newOpenCode = {
            ...prevState,
            [taskNo.toString()]: {
                [data.stepNo]: true,
            },
        };
        return newOpenCode;
    });
}

export async function showCode(
    taskNo: number,
    stepNo: string,
    setOpenCode: Function,
) {
    setOpenCode((prevState: LoadingState) => ({
        ...prevState,
        [taskNo.toString()]: {
            ...prevState[taskNo],
            [stepNo]: !prevState[taskNo]?.[stepNo],
        },
    }));
}
