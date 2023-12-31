import styled from 'styled-components';
import TextareaAutoSize from 'react-textarea-autosize';

export const CodeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 97%;
    height: auto;
    margin-top: 0;
`;

export const AnswerDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 99%;
    align-items: flex-start;
    background-color: #f0f0f0;
    box-shadow:
        4px 4px 10px rgba(54, 54, 54, 0.25),
        -4px 0px 4px rgba(255, 255, 255, 0.25);
    margin-top: 0;
    padding-right: 1%;
    height: auto;
    line-height: 3rem;
    border-radius: 0 0 2rem 2rem;
    padding-left: 2%;
`;

export const IconDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 100%;
    margin: 0;
    padding: 0;
    padding: 1%;
`;

export const ToCodeDiv = styled.div`
    display: flex;
    height: auto;
    justify-content: flex-start;
    padding: 0;
    margin-left: 90%;
    color: #b5b5b5;
    &:hover {
        color: #555555;
    }
`;

export const AnswerArea = styled(TextareaAutoSize)`
    font-size: 1rem;
    width: 94%;
    border: none;
    background-color: #f0f0f0;
    margin-left: 1%;
    margin-bottom: 2.5%;
    resize: none;
    height: auto;
`;

export const CodeButton = styled.button`
    border: none;
    width: 5%;
    padding: 0;
    margin-left: 46%;
    margin-right: 40%;
    height: auto;
    color: #b5b5b5;
    &:hover {
        color: #555555;
        border: none;
    }
`;
