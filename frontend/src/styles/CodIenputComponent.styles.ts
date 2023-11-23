import styled, { keyframes } from 'styled-components';

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
export const blinkCursor = keyframes`
    0% { opacity: 0; };
    50% { opacity: 1; };
    100% { opacity: 0; };
`
export const CodeInput = styled.textarea`
    position: absolute;
    font-size: 1rem;

    margin-top: 0vh;
    margin-right: 0vw;
    margin-bottom: 2.7%;
    margin-left: 0vw;
    padding: 0;
    
    padding-top: 0vh;
    padding-left: 4vw;
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
    
    transform: scaleX(1.1);
    &:focus {
        outline: none;
        caret-color: black;
        animation: ${blinkCursor} 1s step-end infinite;
    }
    &::selection {
        background: #b3d4fs;
    }
    &.no-blick{
        animation: none;
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
    font-family: monospace;

    border: none;
    border-radius: 20px;

    overflow-y: inherit;
    overflow-x: inherit;
    text-overflow: ellipsis;

    color: #000000;
    z-index: 0;

`;
