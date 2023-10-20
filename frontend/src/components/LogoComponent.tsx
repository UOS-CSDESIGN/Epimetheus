import React from 'react';
import styled from 'styled-components';

const LogoDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 106rem;
    height: 9.4rem;
    margin-top: 2.5rem;
    margin-left: 4rem;
    margin-right: 4rem;
    color: #828282;
    text-align: center;
    font-family: Inter;
    font-size: 60px;
    font-style: normal;
    font-weight: 400;
    background-color: #ffffff;
`;

const LogoLine = styled.hr`
    color: #828282;
    height: 0.1rem;
    margin-left: 4rem;
    margin-right: 4rem;
    width: 80vw;
`;
export default function LogoComponent() {
    return (
        <LogoDiv>
            Epimetheus
            <LogoLine />
        </LogoDiv>
    );
}
