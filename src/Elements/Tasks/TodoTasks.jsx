import React from 'react';
import '../../App.css';
import TodoTask from "./TodoTask";

class TodoTasks extends React.Component {


    render = (props) => {

        let tasksElements = this.props.tasks.map(
            task => <TodoTask
                task = {task}
                deleteTask = {this.props.deleteTask}
                changeStatus={this.props.changeStatus}
                changeTitle={this.props.changeTitle}
            />
        );

        return (
            <div className="todoListTasks">

                {tasksElements}

            </div>

        );
    }
}

export default TodoTasks;

