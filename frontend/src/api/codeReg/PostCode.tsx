import { codeType } from './codeType';

interface postCodeType {
    status: number;
    message: string;
}
export default async function PostCode(data: codeType): Promise<postCodeType> {
    data.code = `onmessage(e)=>{ ${data.code} }`;
    const response = await fetch(`${process.env.REACT_APP_base_url}/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    console.log(response);
    if (response.status === 200) {
        return {
            status: 200,
            message: 'success',
        };
    } else {
        const body = await response.json();
        return {
            status: response.status,
            message: body.body.detail,
        };
    }
}
