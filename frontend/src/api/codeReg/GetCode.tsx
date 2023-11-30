import { codeError, codeType } from './codeType';

export default async function GetCode(title: string): Promise<codeType> {
    const res = await fetch(
        `${process.env.REACT_APP_base_url}/code?input=${title}`,
    );

    const data = await res.json();
    const returnCode: codeType = {
        title: data.title,
        code: data.code,
    };
    return returnCode;
}
