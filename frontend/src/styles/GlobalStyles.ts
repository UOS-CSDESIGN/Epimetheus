import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
Button{
    &:hover{
        border : 1px solid gray;
        border-radius : 10px;
    }
}
`;
