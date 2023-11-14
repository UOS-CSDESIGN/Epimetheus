import styled from 'styled-components';

export const TaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 3%;
    align-items: center;
    margin-left: 4.5%;
    margin-right: 4.5%;
    width: 90%;
    height: auto;
    border-radius: 2rem;
    background-color: #f0f0f0;
`;

export const SubTasksDiv = styled.div`
    display: flex;
    flex-direction: column;
    width: 90%;
    min-height: 55vh;
    height: auto;
    overflow: auto;
    margin-top: 1%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 2%;
    padding-bottom: 3%;
    border-radius: 20px;
    background-color: #fff;
`;

export const SubTaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 94%;
    margin-left: 3%;
    margin-right: 3%;
    margin-bottom: 1%;
    margin-top: 0;
    height: fit-content;
`;

export const ExecuteButton = styled.button`
    color: #000000;
    margin: 0;
    padding: 0;
`;
