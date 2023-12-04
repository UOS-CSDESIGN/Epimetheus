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
import { useRef, useEffect } from 'react';

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
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height =
                textareaRef.current.scrollHeight + 'px';
        }
    }, [props.code]);

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
                            ref={textareaRef}
                            value={props.code}
                        ></AnswerArea>
                    </>
                ) : null}
            </AnswerDiv>
        </CodeBox>
    );
}
