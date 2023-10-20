import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TaskCodeViewComponent from '../components/TaskCodeViewComponent';

const mockProps = {
    code: ['Hello World!'],
    handleChange: (newCode: string[]) => {},
};

describe('TaskCodeviewComponent', () => {
    it('renderes without crashing', () => {
        render(
            <TaskCodeViewComponent
                code={mockProps.code}
                handleChange={mockProps.handleChange}
            />,
        );
    });
    it('triggers handleChange when text is changed', () => {
        const handleChange = jest.fn();
        const { getByTestId } = render(
            <TaskCodeViewComponent
                code={mockProps.code}
                handleChange={handleChange}
            />,
        );
        const codeContainer = getByTestId('code-container');
        const newValue = ['January', 'February', 'March'];
        fireEvent.change(codeContainer, {
            target: { value: newValue.join('\n') },
        });
        expect(handleChange).toHaveBeenCalled();
    });
});
