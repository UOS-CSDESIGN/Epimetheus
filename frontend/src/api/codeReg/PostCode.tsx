import { codeType } from './codeType';

interface postCodeType {
    status: number;
    message: string;
}
export default async function PostCode(data: codeType,
): Promise<postCodeType> {
    await fetch(`${process.env.REACT_APP_base_url}/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'Text/plain',
        },
        body: JSON.stringify(data),
    })
        .then((res: any) => {
            return {
                status: res.status,
                message: 'success',
            };
        })
        .catch((err: any) => {
            return {
                status: err.status,
                message: 'error',
            };
        });
    return {
        status: 100,
        message: 'error',
    };
}
