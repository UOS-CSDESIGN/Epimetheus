import React from 'react';
import { TaskViewDiv } from '../styles/TaskViewComponent.styles';

interface TaskViewProps {
    task: string;
}

export default function TaskViewComponent(props: TaskViewProps) {
    return props.task ? <TaskViewDiv>Task : {props.task}</TaskViewDiv> : null;
}
