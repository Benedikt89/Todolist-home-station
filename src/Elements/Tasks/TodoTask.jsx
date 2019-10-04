import React from 'react';
import style from './TodoTask.module.css'

class TodoTask extends React.Component {

    state = {
        editMode: false,
        newTitle: this.props.task.title,
        ifWarning: style.field,
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        if (this.state.newTitle === ""){
            this.setState({editMode: true});
        } else {
            this.setState({editMode: false});
            this.props.changeTitle(this.state.newTitle, this.props.task.id, 'task');
        }
    };

    render = (props) => {
        let checkBoxClick = (e) => {
            this.props.changeStatus(e.currentTarget.checked, this.props.task.id);
        };

        let confirmChangeOnEnter = (e) => {
            if (e.key === 'Enter') {
                this.deactivateEditMode();
            }
        };

        let taskTitleChange = (e) => {
            let text = e.currentTarget.value;
            if (text !== '') {
                this.setState({ifWarning: style.field, newTitle: text});
            } else {
                this.setState({ifWarning: style.fieldWarning, newTitle: text})
            }
        };

        let styleIsdone = () => this.props.task.completed ? style.todoListTaskDone: style.todoListTask;

        return (

                <div className={styleIsdone()}>
                    <input
                        onChange={checkBoxClick}
                        type="checkbox"
                        checked={this.props.task.completed}/>

                    { this.state.editMode
                        ? <input
                            onKeyPress={confirmChangeOnEnter}
                            className={this.state.ifWarning}
                            autoFocus={true}
                            value={this.state.newTitle}
                            onChange={taskTitleChange}
                            onBlur={this.deactivateEditMode}
                        />
                        : <span
                        onClick={this.activateEditMode}
                    >{this.props.task.title}</span>}
                    <span>{' done '+ this.props.task.status}</span>
                    <span>{this.props.task.priority}</span>
                    <button className={style.deleteTask} onClick={()=>{this.props.deleteTask(this.props.task.id)}}>x</button>
                </div>


        );
    }
}

export default TodoTask;

