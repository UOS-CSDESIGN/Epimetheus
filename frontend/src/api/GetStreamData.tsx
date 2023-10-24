import React from 'react';

export default function GetStreamData() {
    const eventSource = new EventSource('http://api.epimetheus.store/tasks');
    eventSource.onopen = () => {
        console.log('connection opened');
    };

    eventSource.onmessage = async (event: any) => {
        const parsedData = JSON.parse(event.data);
        if (parsedData.someCondition) {
            postData(parsedData);
        }
    };

    eventSource.onerror = (event: any) => {
        eventSource.close();
        if (event.error) {
            console.log(event.error);
        }
        if (event.target.readyState === EventSource.CLOSED) {
            console.log('connection closed');
        }
    };

    const postData = async (data: any) => {
        try {
            const res = await fetch('http://api.epimetheus.store/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const result = await res.json();
                console.log('POST request succcess : ', result);
            } else {
                console.error('POST request failed :', res.status);
            }
        } catch (error) {
            console.error('Error in POST request', error);
        }
    };
}
