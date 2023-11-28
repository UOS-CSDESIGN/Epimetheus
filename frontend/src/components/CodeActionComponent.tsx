import CodeExec, { codeInfo } from "../api/worker/codeExec";
import { ExecuteButton } from "../styles/ConsolePage.styles";
import { HiChevronDoubleRight } from "react-icons/hi";

interface CodeActionComponentProps {
    codes: string[];
}
export type execContext = {
    type : string;
    payload: string;
}
export default function CodeActionComponent(props: CodeActionComponentProps) {
    
    const onClick = async () =>{
        
        let nextProp:execContext = {
            type:'',
            payload:''
        };
        for(const item of props.codes) {
            const codeParam: codeInfo={
                code: item,
                type: 'applicaiton/javascript'
            }
            nextProp = await CodeExec(
                codeParam, 
                nextProp);
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
