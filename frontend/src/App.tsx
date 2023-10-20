import React, { useContext, useState } from 'react';
import ConsolePage from './pages/ConsolePage';
import styled from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AppDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: #ffffff;
`;

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AppDiv>
                <ConsolePage />
            </AppDiv>
        </QueryClientProvider>
    );
}
