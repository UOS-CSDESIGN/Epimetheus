import styled from 'styled-components';

export const CodeEditor = styled.div`
    width: 78vw;
    min-height: 70vh;
    max-height: auto;
    overflow: inherit;
    position: relative;
    border-radius: 20px;
    margin: 0;
    padding-top: 1.5vh;
    padding-left: 2vw;
`;
export const CodeInput = styled.textarea`
    position: absolute;
    font-size: 1.05rem;
    margin-top: 0vh;
    margin-right: 0vw;
    margin-bottom: 2.7%;
    margin-left: 0vw;
    padding: 0;
    padding-top: 0vh;
    width: 100%;
    min-height: 80vh;
    max-height: auto;
    border-radius: 0.25rem;
    caret-color: $alert;
    color: transparent;
    background-color: transparent;
    z-index: 1;
    border: none;
    resize: none;
    overflow: hidden;
    &:focus {
        outline: none;
    }
`;
export const Present = styled.pre`
    background-color: #fff;
    width: 76vw;

    min-height: 70vh;
    max-height: auto;

    font-size: 1rem;
    margin: 0;
    padding: 0;
    padding-bottom: 2vh;

    border: none;
    border-radius: 20px;

    overflow-y: inherit;
    overflow-x: inherit;
    text-overflow: ellipsis;

    color: #000000;
    z-index: 0;
`;
