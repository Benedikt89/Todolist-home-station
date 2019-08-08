import React from 'react';
import './App.css';

class TodoTask extends React.Component {


    render = (props) => {

        let checkBoxClick = (e) => {
            console.log(e.currentTarget.checked);
            this.props.isDoneBox(this.props.task);
        };

        return (

                <div className="todoList-task">
                    <input onChange={checkBoxClick} type="checkbox" checked={this.props.task.isDone}/>
                    <span>{this.props.task.title}</span>
                </div>


        );
    }
}

export default TodoTask;

