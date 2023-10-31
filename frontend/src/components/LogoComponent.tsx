import React from 'react';
import styled from 'styled-components';

const LogoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 20%;
    margin-top: 2%;
    margin-left: 5%;
    margin-right: 5%;
    margin-bottom: 2%;
    color: #828282;
    text-align: center;
    font-family: Inter;
    font-size: 6rem;
    font-style: normal;
    font-weight: 600;
    background-color: #f0f0f0;
`;

export default function LogoComponent() {
    return (
        <LogoDiv>
            EPIMETHEUS
        </LogoDiv>
    );
}
