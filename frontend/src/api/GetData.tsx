import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export async function GetData(text: string, handleData: any) {
    const eventSource = new EventSource(
        `http://api.epimetheus.store/tasks?task=${text}`,
    );
    eventSource.onopen = () => {
        console.log('Connection opened');
    };
    eventSource.onmessage = async (event: any) => {
        const response = await event.data;
        const data = JSON.parse(response);

        handleData(data);
    };
    eventSource.onerror = (event: any) => {
        eventSource.close();
        if (event.error) {
            console.log('Error:', event.error);
        }
        if (event.target.readyState === EventSource.CLOSED) {
            console.log('Connection closed');
        }
    };
}