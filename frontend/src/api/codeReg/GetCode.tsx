import { codeError, codeType } from "./codeType";

export interface getCodeType{
    isResponse: boolean;
    response: codeType | null;
    error: codeError | null;
}

export default async function GetCode(url: string): Promise<getCodeType> {

    await fetch(url)
        .then((res:any) => {
            console.log(res);
            const returnCode:codeType = {
                title: res.title,
                language: res.language,
                code: res.code
            };
            const returnVal: getCodeType = {
                isResponse: true,
                response: returnCode,
                error: null
            };
            return returnVal;
        })
        .catch((err)=>{
            const errResponse: codeError = {
                errCode: err.status,
                errMessage: err.message
            };
            const returnVal: getCodeType = {
                isResponse: false,
                response: null,
                error: errResponse
            };
            return returnVal;
        });
    return {
        isResponse: false,
        response: null,
        error: null
    };
}