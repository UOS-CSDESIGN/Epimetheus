import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

const baseURL = 'http://localhost:8000';

export default function GetQuery() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['cityName'],
        queryFn: async () => {
            const response = await fetch('http://localhost:8000/cities');
            const data = await response.json();
            return data;
        },
    });
    useEffect(() => {
        console.log(data);
    }, []);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: </div>;
    }

    return (
        <div>
            <p>{data.cityName}</p>
        </div>
    );
}
