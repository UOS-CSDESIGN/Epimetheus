import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { FaCopy } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import {
    CodeBox,
    IconDiv,
    ToCodeDiv,
    AnswerDiv,
    AnswerArea,
    CodeButton,
} from '../styles/TaskCodeViewComponent.styles';
import { useNavigate } from 'react-router';

interface TaskCodeProps {
    handleButton: (e: React.MouseEvent<HTMLElement>) => void;
    handleCode: boolean;
    code: string[];
}

export default function TaskCodeViewComponent(props: TaskCodeProps) {
    /*
    code input page에서 가져올 코드에 대한 정보를 query string으로 전달
    
    const navi = useNavigate();
    const onClick = () => {
        navi(`/code?info=${encodeURIComponent(props.codeInfo)}`);
    }
    */
    return (
        <CodeBox>
            <AnswerDiv>
                <IconDiv>
                    <CodeButton onClick={props.handleButton}>
                        {props.handleCode ? (
                            <HiOutlineChevronUp size="1.5rem" />
                        ) : (
                            <HiOutlineChevronDown size="1.5rem" />
                        )}
                    </CodeButton>
                    <ToCodeDiv>
                        <FaCopy size="1.5rem" />
                        <FiArrowUpRight size="1.5rem" />
                    </ToCodeDiv>
                </IconDiv>
                {props.handleCode ? (
                    <AnswerArea
                        value={props.code}
                        isCode={props.handleCode}
                    ></AnswerArea>
                ) : null}
            </AnswerDiv>

            
        </CodeBox>
    );
}
