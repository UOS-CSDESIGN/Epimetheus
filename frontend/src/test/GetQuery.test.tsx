import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GetQuery from '../api/GetQuery';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

describe('GetQuery', () => {
    it('renders without crashing', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <GetQuery />
            </QueryClientProvider>,
        );
    });
});
