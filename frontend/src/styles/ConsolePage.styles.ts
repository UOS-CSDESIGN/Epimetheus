import styled from 'styled-components';

export const TaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 4%;
    margin-right: 4%;
    width: 90%;
    height: 90%;
    border-radius: 2rem;
    background-color: #f0f0f0;
`;

export const SubTasksDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 90%;
    min-height: 55vh;
    height: auto;
    overflow: auto;
    margin-top: 1%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 2%;
    border-radius: 20px;
    align-items: center;
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
    height: fit-content;
`;
