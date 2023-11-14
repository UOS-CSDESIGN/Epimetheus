import CodeExec, { codeInfo } from "../api/worker/codeExec";
import { ExecuteButton } from "../styles/ConsolePage.styles";

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
        for(const code of props.codes) {
            const codeParam: codeInfo={
                code: code,
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
            Exec
        </ExecuteButton>
    );
}
