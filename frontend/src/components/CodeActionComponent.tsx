import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CodeExec, { codeInfo } from "../api/worker/codeExec";
import { ExecuteButton } from "../styles/ConsolePage.styles";
import { HiChevronDoubleRight } from "react-icons/hi";
import GetCode from "../api/codeReg/GetCode";
import { CodeState } from "../StateContextType";

interface CodeActionComponentProps {
    isConclusion: boolean;
    taskNo: string;
    title: Record<string, string>;
    setCode: Dispatch<SetStateAction<CodeState>>;
}
export type execContext = {
    type : string;
    payload: string;
}
export default function CodeActionComponent(props: CodeActionComponentProps) {
    
    const [codes, setCodes] = useState<string[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    useEffect(()=>{

        if(props.isConclusion === true){
            Promise.all(Object.values(props.title).map(title=>GetCode(title)))
            .then(res=>{
                res.forEach(resp=>{
                    setCodes((prev:string[])=>([...prev, resp.code]));
                });    
                setLoading((prev:boolean)=>(!prev));
            })
            .catch(err=>{
                console.error(err);
            });
        }
    }, [props.isConclusion]);
    useEffect(()=>{
        if(codes.length!==0){
            codes.map((code, idx)=>{
                props.setCode((prev:CodeState)=>{
                    const newState = {
                        ...prev,
                        [props.taskNo.toString()]:{
                            ...prev[props.taskNo],
                            [idx+1]: code
                        }
                    }
                    return newState;
                });
            });
        }
    },[isLoading]);
    const onClick = async () =>{
        let nextProp:execContext = {
            type:'',
            payload:''
        };
        for(const item of codes) {
            const codeParam: codeInfo={
                code: item,
                type: 'applicaiton/javascript'
            }
            nextProp = await CodeExec(
                codeParam, 
                nextProp
            );
            if(nextProp.type === 'window'){
                window.open(nextProp.payload, '_blank');
            }
        }
    }
    return (
        <ExecuteButton onClick={onClick}>
            <HiChevronDoubleRight />
        </ExecuteButton>
    );
}