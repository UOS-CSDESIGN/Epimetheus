import { execContext } from "../../components/CodeActionComponent";
export interface codeInfo{
    code: string;
    type: string;
}
export default async function CodeExec(code: codeInfo, param: execContext): Promise<execContext>{
    
    const codeObj = new Blob([`onmessage=(e)=>{${code.code}}`], {type: code.type});
    const codeUrl = URL.createObjectURL(codeObj);
    const thread = new Worker(codeUrl);

    return await new Promise<execContext>((resolve)=>{
        thread.onmessage = (e: MessageEvent) => {
            resolve(e.data);
            URL.revokeObjectURL(codeUrl);
            thread.terminate();
        }
        thread .postMessage(param);
    })
}