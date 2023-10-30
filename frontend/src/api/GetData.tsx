import React from 'react';

export async function GetData() {
    const eventSource = new EventSource('http://api.epimetheus.store/tasks');
    eventSource.onopen = () => {
        console.log('Connection opened');
    };
    eventSource.onmessage = async (event: any) => {
        const response = await event.data;
        const data = JSON.parse(response);
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
