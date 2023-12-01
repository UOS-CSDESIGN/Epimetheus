import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import CodeExec, { codeInfo } from '../api/worker/codeExec';
import { ExecuteButton } from '../styles/ConsolePage.styles';
import { FaPlay } from 'react-icons/fa';
import GetCode from '../api/codeReg/GetCode';
import { CodeState } from '../StateContextType';

interface CodeActionComponentProps {
    isConclusion: boolean;
    taskNo: string;
    title: Record<string, string>;
    setCode: Dispatch<SetStateAction<CodeState>>;
}
export type execContext = {
    type: string;
    payload: string;
};
export default function CodeActionComponent(props: CodeActionComponentProps) {
    const [codes, setCodes] = useState<string[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (props.isConclusion === true) {
            Promise.all(Object.values(props.title).map(title => GetCode(title)))
                .then(res => {
                    res.forEach(resp => {
                        setCodes((prev: string[]) => [...prev, resp.code]);
                    });
                    setLoading((prev: boolean) => !prev);
                })
                .catch(err => {
                    console.error(err);
                });
        }
    }, [props.isConclusion]);
    useEffect(() => {
        if (codes.length !== 0) {
            codes.map((code, idx) => {
                props.setCode((prev: CodeState) => {
                    const newState = {
                        ...prev,
                        [props.taskNo.toString()]: {
                            ...prev[props.taskNo],
                            [idx + 1]: code,
                        },
                    };
                    return newState;
                });
            });
        }
    }, [isLoading]);

    const onClick = async () => {
        let nextProp: execContext = {
            type: '',
            payload: '',
        };
        for (const item of codes) {
            const codeParam: codeInfo = {
                code: item,
                type: 'applicaiton/javascript',
            };
            nextProp = await CodeExec(codeParam, nextProp);

            if (nextProp.type === 'window') {
                window.open(nextProp.payload, '_blank');
            }
            else if(nextProp.type === 'HTML'){
                const newWindow = window.open('','_blank');
                if(newWindow){
                    newWindow.document.head.innerHTML = `
                    <title>output</title>
                    <meta charset-"UTF-8">
                    <style>
                        body{
                            padding:20px;
                        }
                    </style>
                    `;
                    newWindow.document.body.innerHTML = nextProp.payload;
                    
                }
                else{
                    console.error("Failed to open a new window");
                }
            }
        }
    };
    return (
        <ExecuteButton onClick={onClick}>
            <FaPlay />
        </ExecuteButton>
    );
}
