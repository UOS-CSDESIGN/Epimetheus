import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import SubTaskComponent from '../components/SubTaskComponent';

const mockProps = {
    text: 'hello world',
    handleCode: false,
    onChangeText: (event: React.ChangeEvent<HTMLTextAreaElement>) => {},
    handleButton: () => {},
};

describe('SubTaskComponent', () => {
    it('renders without crashing', () => {
        render(
            <SubTaskComponent
                text={mockProps.text}
                handleCode={mockProps.handleCode}
                onChangeText={mockProps.onChangeText}
                handleButton={mockProps.handleButton}
            />,
        );
    });
    it('triggers onChangeText when text is changed', () => {
        const onChangeText = jest.fn();
        const { getByTestId } = render(
            <SubTaskComponent
                text={mockProps.text}
                handleCode={mockProps.handleCode}
                onChangeText={onChangeText}
                handleButton={mockProps.handleButton}
            />,
        );
        const textContainer = getByTestId('text-container');
        const newValue = ['asf124124zsdvadf', 'asdfdfqeqe', 'asdasdasd'];
        fireEvent.change(textContainer, { target: { value: newValue } });
        expect(onChangeText).toHaveBeenCalled();
    });
    it('calls handleButton when button is clicked', () => {
        const handleButton = jest.fn();
        const { getByTestId } = render(
            <SubTaskComponent
                text={mockProps.text}
                handleCode={mockProps.handleCode}
                onChangeText={mockProps.onChangeText}
                handleButton={handleButton}
            />,
        );
        fireEvent.click(getByTestId('code-button'));
        expect(handleButton).toHaveBeenCalled();
    });
});
