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
    border: 0.01rem solid black;
    border-radius: 0.5rem;
    min-height: 60vh;
    margin-left: 5.5vw;
    margin-top: 2vh;
    width: 80vw;
`;

export const SubmitButton = styled.button`
    width: 9vw;
    height: 5vh;
    margin-top: 2vh;
    margin-bottom: 0;
    margin-right: 0;
    margin-left: 77vw;
    background-color: #ffffff;
    border: 0.1rem solid #808080;
    border-radius: 1rem;
    color: #000000;
    &:hover {
        color: #000000;
    }
`;
export const SubtaskDiv = styled.div`
    display: flex;
    width: 80vw;
    margin-left: 5vw;
    margin-right: 5vw;
    align-items: center;
`;
