import React from 'react';
import style from './TodoTask.module.css'

class TodoTask extends React.Component {

    state = {
        editMode: false,
        ifWarning: style.field,
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {

        if (this.props.task.title === ""){
            this.setState({ifWarning: style.fieldWarning});
            this.setState({editMode: true});
        }
        this.setState({editMode: false})
    };

    render = (props) => {

        let checkBoxClick = (e) => {
            this.props.isDoneBox(e.currentTarget.checked, this.props.task.id);
        };

        let taskChange = (e) => {
            let text = e.currentTarget.value;
            this.props.changeTitle(text, this.props.task.id);
            if (text != '') {
                this.setState({ifWarning: style.field});
            } else {
                this.setState({ifWarning: style.fieldWarning})
            }
        };

        let styleIsdone = () => this.props.task.isDone === true ? style.todoListTaskDone: style.todoListTask;

        let fieldEmptyError = () => {
            if (this.props.task.id !='') {
                this.setState({ifWarning: style.field})
            }
        };

        return (

                <div className={styleIsdone()}>
                    <input
                        onChange={checkBoxClick}
                        type="checkbox"
                        checked={this.props.task.isDone}/>

                    { this.state.editMode
                        ? <input
                            className={fieldEmptyError}
                            autoFocus={true}
                            value={this.props.task.title}
                            onChange={taskChange}
                            onBlur={this.deactivateEditMode}
                        />
                        : <span
                        onClick={this.activateEditMode}
                    >{this.props.task.title}</span>}
                    <span>{' id= '+ this.props.task.id}</span>
                    <span>{this.props.task.priority}</span>
                </div>


        );
    }
}

export default TodoTask;

