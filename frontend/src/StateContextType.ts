type Data = {
    property: string;
    wrapper?: string[];
    stepNo?: string;
    title?: string;
    description?: string;
};

export type TitleState = Record<string, Record<string, string>>;
export type LoadingState = Record<string, Record<string, boolean>>;
export type CodeState = Record<string, Record<string, string>>;
