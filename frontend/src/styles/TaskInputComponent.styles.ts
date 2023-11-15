import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const TaskInputDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: 8%;
    margin-top: 1%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 2%;
    padding-right: 1%;
    filter: drop-shadow(4px 4px 10px rgba(54, 54, 54, 0.25))
        drop-shadow(-4px -4px 4px rgba(255, 255, 255, 0.25));
    border-radius: 2rem;
    background-color: #ffffff;
`;
export const TaskInput = styled(TextareaAutosize)`
    display: flex;
    background-color: #ffffff;
    border-radius: 1.5rem;
    padding: 2%;
    padding-top: 1%;
    padding-bottom: 1%;
    width: 100%;
    height: 10%;
    resize: none;
    border: none;
    color: black;
    font-size: 1rem;
    font-family: Inter;
    font-weight: 400;
    outline: 0;
`;
export const ActionButtons = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #e0e0e0;
    background-color: #ffff;
    border: none;
    font-size: 100%;
    color: black;
    padding: 1%;
    height: auto;
    margin-left: 0%;
    margin-right: 1%;
`;
