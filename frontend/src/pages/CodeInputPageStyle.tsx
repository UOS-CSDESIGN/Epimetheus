import styled from "styled-components";

export type SubmitButtonProps = {
    isVisible: boolean; 
    position: number;
}
export const SwitchButton = styled.button<SubmitButtonProps>`

    position: sticky;
    top: 80vh;
    left: 95vw;
    align-items: center;
    text-align: center;
    width: 15px;
    height: 15px;
    margin: 0;
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
    opacity: ${props => props.isVisible ? '1' : '0' };
`;

export const CodeInputP = styled.div`
    display: flex;
    flex-direction: column;
    allign-items: center;
    width: 99vw;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background-color: #ffffff;
`;
export const CodeInputLayer = styled.div`

    background-color: #f0f0f0;
    width: 99vw;

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
    width: 90vw;
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
    margin-left: 80vw;
    background-color: #ffffff;
    border: none;
    border-radius: 20px;
    color: #ff0000;
`;