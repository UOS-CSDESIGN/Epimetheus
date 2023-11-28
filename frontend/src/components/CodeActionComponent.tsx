import { useEffect, useState } from "react";
import CodeExec, { codeInfo } from "../api/worker/codeExec";
import { ExecuteButton } from "../styles/ConsolePage.styles";
import { HiChevronDoubleRight } from "react-icons/hi";
import GetCode from "../api/codeReg/GetCode";

interface CodeActionComponentProps {
    isConclusion: boolean;
    title: Record<string, string>;
}
export type execContext = {
    type : string;
    payload: string;
}
export default function CodeActionComponent(props: CodeActionComponentProps) {
    
    const [codes, setCodes] = useState<string[]>([]);

    useEffect(()=>{
        if(props.isConclusion === true){
            Promise.all(Object.values(props.title).map(title=>GetCode(title)))
            .then(res=>{
                res.forEach(resp=>{
                    console.log(resp.code);
                    setCodes((prev:string[])=>([...prev, resp.code]));
                });
            })
            .catch(err=>{
                console.error(err);
            })
        }
    }, [props.isConclusion]);
    const onClick = async () =>{
        let nextProp:execContext = {
            type:'',
            payload:''
        };
        for(const item of codes) {
            console.log(item);
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
