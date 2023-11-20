import pulse from '../assets/pulse.gif';
import styled from 'styled-components';

const NowLoading = styled.img`
    align-items: center;
    margin: 0;
    margin-left: 47%;
    margin-right: 47%;
    padding: 0;
    background-color: transparent;
    width: 6%;
    height: auto;
`;
export default function LoadingComponent() {
    return <NowLoading src={pulse} alt="loading" />;
}
