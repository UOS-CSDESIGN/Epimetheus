import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import { FaCopy } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import {
    CodeBox,
    IconDiv,
    AnswerDiv,
    AnswerArea,
    CodeButton,
} from '../styles/TaskCodeViewComponent.styles';

interface TaskCodeProps {
    handleButton: (e: React.MouseEvent<HTMLElement>) => void;
    handleCode: boolean;
    code: string[];
}

export default function TaskCodeViewComponent(props: TaskCodeProps) {
    return (
        <CodeBox>
            <AnswerDiv>
                <IconDiv>
                    <FaCopy size="2rem" />
                    <FiArrowUpRight size="2rem" />
                </IconDiv>
                {props.handleCode ? (
                    <AnswerArea
                        value={props.code}
                        isCode={props.handleCode}
                    ></AnswerArea>
                ) : null}
            </AnswerDiv>

            <CodeButton onClick={props.handleButton}>
                {props.handleCode ? (
                    <HiOutlineChevronUp size="1.5rem" />
                ) : (
                    <HiOutlineChevronDown size="1.5rem" />
                )}
            </CodeButton>
        </CodeBox>
    );
}
