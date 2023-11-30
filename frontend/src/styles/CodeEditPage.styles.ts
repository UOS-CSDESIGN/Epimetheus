import Editor from 'react-simple-code-editor';
import styled from 'styled-components';

export const CodeEditDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 90vw;
    min-height: 60vh;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: #ffffff;
`;

export const StyledEditor = styled(Editor)`
    border: 1px solid black;
    border-radius: 0.5rem;
    min-height: 60vh;
    margin-left: 3vw;
    margin-top: 2vh;
    width: 85vw;
`;

export const SubmitButton = styled.button`
    width: 10vw;
    height: 7vh;
    margin-top: 2vh;
    margin-bottom: 0;
    margin-right: 0;
    margin-left: 80vw;
    background-color: #ffffff;
    border: none;
    border-radius: 20px;
    color: #000000;
`;
export const SubtaskDiv = styled.div`
    width: 80vw;
    margin-left: 5vw;
    margin-right: 5vw;
`;
