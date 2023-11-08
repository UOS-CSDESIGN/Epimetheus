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
    stepId: string;
}

export default function TaskCodeViewComponent(props: TaskCodeProps) {
    const navi = useNavigate();
    const onClick = () => {
        navi(`/code?info=${encodeURIComponent(props.stepId)}`);
        console.log(props.stepId);
    };
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
                </IconDiv>
                {props.handleCode ? (
                    <>
                    <ToCodeDiv onClick={onClick}>
                        <FaCopy size="1.5rem" />
                        <FiArrowUpRight size="1.5rem" />
                    </ToCodeDiv>
                    <AnswerArea
                        value={props.code}
                        isCode={props.handleCode}
                    ></AnswerArea>
                    </>
                ) : null}
            </AnswerDiv>
        </CodeBox>
    );
}
