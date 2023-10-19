import styled from 'styled-components';
import React from 'react';

const IntroDiv = styled.div`
    display: flex;
`;

interface IntroProps {
    intro: string;
}

export default function IntroComponent({ intro }: IntroProps) {
    return <IntroDiv> {intro}</IntroDiv>;
}
