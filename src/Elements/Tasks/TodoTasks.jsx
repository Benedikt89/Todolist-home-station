import React from 'react';
import '../../App.css';
import TodoTask from "./TodoTask";
import {Droppable} from "react-beautiful-dnd";

export const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? '#0a0a0a' : 'black',
});

class TodoTasks extends React.Component {


    render = () => {

        let tasksElements = this.props.tasks.map(
            (task, index) => <TodoTask
                key={task.id}
                task={task}
                index={index}
                deleteTask={this.props.deleteTask}
                changeStatus={this.props.changeStatus}
                changeTitle={this.props.changeTitle}
            />
        );

        return (
            <Droppable droppableId={this.props.dragId}>
                {(provided, snapshot) => (
                    <div ref={provided.innerRef}
                         style={getListStyle(snapshot.isDraggingOver)}
                         className="todoListTasks"
                    >
                        {tasksElements}

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

        );
    }
}

export default TodoTasks;

