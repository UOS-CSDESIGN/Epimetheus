import { execContext } from "../../components/CodeActionComponent";
export interface codeInfo{
    code: string;
    type: string;
}
export default async function CodeExec(code: codeInfo, param: execContext): Promise<execContext>{
    
    const codeObj = new Blob([code.code], {type: code.type});
    const codeUrl = URL.createObjectURL(codeObj);
    const thread = new Worker(codeUrl);

    return await new Promise<execContext>((resolve)=>{
        thread.onmessage = (e: MessageEvent) => {
            URL.revokeObjectURL(codeUrl);
            thread.terminate();
            resolve(e.data);
        }
        thread .postMessage(param);
    })
}