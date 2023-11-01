import styled from 'styled-components';

export const CodeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 1%;
`;

export const AnswerDiv = styled.textarea`
    font-size: 1.6rem;
    width: 98%;
    resize: none;
    height: auto;
    line-height: 3rem;
    border-radius: 10px;
`;

export const CodeButton = styled.button`
    border: thin solid #d6d6d6;
    width: 4rem;
    height: 3rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
`;
