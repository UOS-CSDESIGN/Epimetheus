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
    const body = await response.json();
    if (body.status === 200) {
        console.log('done', body);
        return {
            status: body.status,
            message: 'success',
        };
    } else {
        console.error(body.detail);
        return {
            status: body.status,
            message: body.detail,
        };
    }
}
