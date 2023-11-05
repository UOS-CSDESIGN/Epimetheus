import styled from 'styled-components';

type SubTaskTextType={
    isCode: boolean;
}
export const SubTaskDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: fit-content;
    align-items: center;
    margin-bottom: 0;
`;
export const SubTaskTextDiv = styled.div<SubTaskTextType>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 1%;
    padding-right: 1%;
    margin-bottom: 0;
    border: 1;
    border-color: #000000;
    ${props=>props.isCode ? 'border-radius: 2rem 2rem 0 0;': 'border-radius: 2rem;'}
    width: 99%;
    height: auto;
    background-color: #f0f0f0;
    ${props=>props.isCode ? 'box-shadow: 4px 0px 10px rgba(54, 54, 54, 0.25), -4px -4px 4px rgba(255, 255, 255, 0.25);':
        'box-shadow: 4px 4px 10px rgba(54, 54, 54, 0.25), -4px -4px 4px rgba(255, 255, 255, 0.25);'}
    
`;

export const TextTitleContainer = styled.textarea`
    width: 98%;
    padding: 1%;
    padding-top: 2%;
    height: auto;
    overflow: visible;
    border: 0;
    resize: none;
    background-color: #fff;
    color: #828282;
    font-family: Inter;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.8rem;
    vertical-align: middle;
    background: transparent;
    border-bottom: solid;
    border-width: thin;
    border-color: #d6d6d6;
`;

export const TextBodyContainer = styled.textarea`
    width: 98%;
    padding: 1%;
    padding-top: 2%;
    padding-bottom: 2%;
    height: auto;
    overflow: visible;
    border: 0;
    resize: none;
    background-color: #fff;
    color: #828282;
    font-family: Inter;
    font-size: 1.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.8rem;
    vertical-align: middle;
    background: transparent;
`;
