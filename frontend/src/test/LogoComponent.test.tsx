import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LogoComponent from '../components/LogoComponent';

describe('LogoComponent', () => {
    it('renders without crashing', () => {
        render(<LogoComponent />);
    });
});
