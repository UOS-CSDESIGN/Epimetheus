
import React from 'react'
import styled from 'styled-components';
//parent width 90vw, right margin 5vw, left margin 5vw
const SelectLang = styled.select`
    width: 12vw;
    height: 3vh;
    margin-left: 73vw;
    margin-top: 4vh;
    margin-bottom: 0;
    margin-rigth: 5vw;
    border: none;
    background-color: #f0f0f0;
    text-align: right;
`;
interface LanguageSelectProps {
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
export default function LanguageSelectComponent(props: LanguageSelectProps) {
  return (
    <SelectLang name='language' onChange={props.onChange} >
        <option value={'python'}>python</option>
        <option value={'javascript'}>javascript</option>
        <option value={'c'}>c</option>
        <option value={'c++'}>c++</option>
    </SelectLang>
  )
}
