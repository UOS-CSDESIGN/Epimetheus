import styled from 'styled-components';

export const CodeEditor = styled.div`
    width: 80vw;
    min-height: 70vh;
    max-height: auto;
    overflow: inherit;
    position: relative;
    border-radius: 20px;
    font-size: 1rem;
    margin: 0;
`;
export const CodeInput = styled.textarea`
    position: absolute;
    margin-top: 0vh;
    margin-right: 0vw;
    margin-bottom: 2.7%;
    margin-left: 2vw;
    padding: 0;
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

    margin-top: 0;
    margin-right: 0;
    margin-bottom: 0;
    margin-left: 0;

    padding-bottom: 2vh;
    padding-top: 0vh;
    padding-left: 2vw;
    padding-right: 2vw;

    border: none;
    border-radius: 20px;

    overflow-y: inherit;
    overflow-x: inherit;
    text-overflow: ellipsis;

    color: #000000;
    z-index: 0;
`;
