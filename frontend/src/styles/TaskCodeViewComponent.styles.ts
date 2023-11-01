import styled from 'styled-components';

export const CodeBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 0;
`;
type Asnwertype = {
    isCode: boolean;
}
export const AnswerDiv = styled.textarea<Asnwertype>`
    font-size: 1.6rem;
    width: 100%;
    border: none;
    background-color: #f0f0f0;
    box-shadow: 4px 4px 10px rgba(54, 54, 54, 0.25),
        -4px 0px 4px rgba(255, 255, 255, 0.25);
    resize: none;
    margin-top: 0;
    height: auto;
    line-height: 3rem;
    border-radius: 0 0 2rem 2rem;
`;

export const CodeButton = styled.button`
    border: thin solid #d6d6d6;
    width: 4rem;
    height: 3rem;
    border-bottom-left-radius: 2rem;
    border-bottom-right-radius: 2rem;
`;
