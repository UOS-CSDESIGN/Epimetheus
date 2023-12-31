import styled, { keyframes } from 'styled-components';

export const TaskViewDiv = styled.div`
    display: flex;
    width: 90%;
    justify-content: center;
    height: auto;
    overflow: auto;
    resize: none;
    color: #828282;
    padding-left: 5%;
    padding-right: 5%;
    margin-top: 1%;
    font-family: Inter;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: 3rem;
    text-align: center;
    border: 2px solid #828282;
    border-radius: 1rem;
`;

export const showTask = keyframes`
    from {
        opacity : 0;
        transform : translateY(10%);
    }
    to{
        opacity : 1;
        transform : translateY(0);
    }
`;
