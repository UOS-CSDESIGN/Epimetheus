import React from 'react';
import styled from 'styled-components';
//parent width 90vw, right margin 5vw, left margin 5vw
const SelectLang = styled.select`
    width: 10vw;
    height: 3vh;
    margin-left: 75vw;
    margin-top: 4vh;
    margin-bottom: 0;
    margin-right: 5vw;
    border: 0;
    background-color: #f0f0f0;
    text-align: right;
`;
interface LanguageSelectProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function LanguageSelectComponent(props: LanguageSelectProps) {
    return (
        <SelectLang name="language" onChange={props.onChange}>
            <option value={'javascript'}>javascript</option>
        </SelectLang>
    );
}
