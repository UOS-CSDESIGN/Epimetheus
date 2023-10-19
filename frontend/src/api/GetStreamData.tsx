import React from 'react';

export default function GetStreamData() {
    const eventSource = new EventSource('');
    eventSource.onopen = () => {
        console.log('connection opened');
    };

    eventSource.onmessage = async (event: any) => {
        const parsedData = JSON.parse(event.data);
        // console.log(parsedData);
        // 받아온 데이터를 각 변수에 담는 로직 처리
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
}
