import React from 'react';
import './App.css';

class Header extends React.Component {

    inputTasks = React.createRef();

    render = () => {

        let changeText = () => {
            let text = this.inputTasks.current.value;
            this.props.textHolder(text);
        };

        let addClick = () => {
        this.props.addNewTask();
            console.log('click')
        };


        return (
            <div className="todoList-header">
                <h3 className="todoList-header__title">What to Learn</h3>
                <div className="todoList-newTaskForm">
                    <input
                        type="text"
                        placeholder="New task name"
                        ref={this.inputTasks}
                        onChange={changeText}
                    />
                    <button onClick={addClick}>Add</button>
                </div>
            </div>

        );
    }
}

export default Header;

