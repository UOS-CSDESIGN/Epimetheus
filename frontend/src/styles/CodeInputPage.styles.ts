import styled from 'styled-components';

export type SubmitButtonProps = {
    isVisible: boolean;
    position: number;
};
export const SwitchButton = styled.button<SubmitButtonProps>`
    position: sticky;
    top: 80vh;
    margin: 0;
    margin-left: 82vw;
    align-items: center;
    text-align: center;
    width: 15px;
    height: 15px;
    padding: 0;
    border: none;

    border-radius: 50px;
    background-color: transparent;
    color: #000000;
    font-size: 2rem;

    z-index: 2;
    border: none;
    border-radius: 100%;
    transition: opacity 0.3s;
    opacity: ${props => (props.isVisible ? '1' : '0')};

    &:hover {
        border: none;
        color: #808080;
    }
`;

export const CodeInputP = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 99vw;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: #ffffff;
`;
export const CodeInputLayer = styled.div`
    background-color: #f0f0f0;
    width: 90vw;

    min-height: 100vh;
    max-height: auto;

    margin-top: 0vh;
    margin-bottom: 0vh;
    margin-left: 0;
    margin-right: 0vw;

    padding-top: 0vh;
    padding-bottom: 0vh;
    padding-left: 0vw;
    padding-right: 0vw;

    border: none;
    border-radius: 20px;

    overflow: inherit;
    text-overflow: ellipsis;
`;
export const CodeInput = styled.div`
    background-color: #ffffff;
    width: 80vw;
    min-height: 80vh;
    max-height: auto;

    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 1vh;
    margin-bottom: 1vh;
    border-radius: 20px;
    padding: 0;

    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
`;
export const SubmitButton = styled.button`
    width: 13vw;
    height: 7vh;
    margin-top: 2vh;
    margin-bottom: 0;
    margin-right: 0;
    margin-left: 72vw;
    background-color: #ffffff;
    border: 0.1rem solid black;
    border-radius: 20px;
    color: #000000;
`;
export const SubtaskDiv = styled.div`
    width: 80vw;
    margin-left: 5vw;
    margin-right: 5vw;
`;
