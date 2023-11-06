import styled from 'styled-components';

export const CodeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 97%;
    margin-top: 0;
`;
type Answertype = {
    isCode: boolean;
};

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
    width: 10%;
    margin-top: 1%;
    margin-bottom: 1%;
    margin-left: 90%;
    margin-right: 0%;
    padding: 0;
    color: #B5B5B5;
    &:hover {
        color: #555555;
    }
`;

export const AnswerArea = styled.textarea<Answertype>`
    font-size: 1.5rem;
    width: 99%;
    border: none;
    background-color: #f0f0f0;
    margin-bottom: 1%;
    resize: none;
`;

export const CodeButton = styled.button`
    border: thin solid #d6d6d6;
    width: 4rem;
    height: 3rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
    &:hover {    
        border-bottom-left-radius: 2rem;
        border-bottom-right-radius: 2rem;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
`;
