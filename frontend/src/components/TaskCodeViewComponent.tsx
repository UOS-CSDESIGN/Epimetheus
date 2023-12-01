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
    code: string;
    taskNo: string;
    stepNo: string;
}

export default function TaskCodeViewComponent(props: TaskCodeProps) {
    const navi = useNavigate();
    const onClick = () => {
        if (props.code !== undefined && props.code !== '') {
            navi(
                `/edit?task=${encodeURIComponent(
                    props.taskNo,
                )}&subtask=${encodeURIComponent(props.stepNo)}`,
            );
        } else {
            alert('There are no Codes! Wait for a second');
        }
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
                            readOnly
                            value={props.code}
                            isCode={props.handleCode}
                        ></AnswerArea>
                    </>
                ) : null}
            </AnswerDiv>
        </CodeBox>
    );
}
