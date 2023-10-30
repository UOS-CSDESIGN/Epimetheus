import React, { useEffect } from 'react';

export async function* PostData(text: string) {
    try {
        const response = await fetch('http://api.epimetheus.store/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'Text/plain',
            },
            body: JSON.stringify({ text }),
        });
        console.log(response);

        if (!response.body) {
            console.log('Response body is empty');
            return;
        }
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                console.log('Stream complete');
                break;
            }
            const chunks = decoder.decode(value).split('\n');
            for (const chunk of chunks) {
                if (chunk.trim() === '') continue;
                const tempData = chunk
                    .substring(chunk.indexOf('data:') + 'data:'.length)
                    .trim();
                try {
                    const data = JSON.parse(tempData);
                    yield data;
                } catch (error) {
                    console.error('Invalid JSON:', tempData);
                }
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
