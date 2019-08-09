import React from 'react';
import '../../App.css';
import TodoTask from "./TodoTask";

class TodoTasks extends React.Component {


    render = (props) => {

        let tasksElements = this.props.tasks.map(
            task => <TodoTask
                task = {task}
                isDoneBox={this.props.isDoneBox}
                changeTitle={this.props.changeTitle}
            />
        );

        return (
            <div className="todoList-tasks">

                {tasksElements}

            </div>

        );
    }
}

export default TodoTasks;

