import React from 'react';
import { IntroDiv } from '../styles/IntroComponent.styles';

interface IntroProps {
    intro: string;
}

export default function IntroComponent({ intro }: IntroProps) {
    return <IntroDiv> {intro}</IntroDiv>;
}
