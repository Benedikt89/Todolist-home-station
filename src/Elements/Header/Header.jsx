import React from 'react';
import style from './Header.module.css'
import AddItem from "../AddItem/AddItem";


class Header extends React.Component {

    state = {
        editMode: false,
        newTitle: this.props.title,
        ifWarning: style.textField,
    };

    activateEditMode = () => {
        this.setState({editMode: true});
    };

    deactivateEditMode = () => {
        if (this.state.newTitle === ""){
            this.setState({editMode: true});
        } else {
            this.setState({editMode: false, newTitle: this.props.title});
            this.props.changeTitle(this.state.newTitle, this.props.id, 'list');
        }
    };
    confirmChangeOnEnter = (e) => {
        if (e.key === 'Enter') {
            this.deactivateEditMode();
        }
    };
    titleChange = (e) => {
        let text = e.currentTarget.value;
        if (text !== '') {
            this.setState({ifWarning: style.textField, newTitle: text});
        } else {
            this.setState({ifWarning: style.error, newTitle: text})
        }
    };
    render = (props) => {

        return (
            <div className={style.todoListHeader}>
                <div className={'row'}>

                    {!this.state.editMode?<h3 className={style.todoListHeaderTitle} onDoubleClick={this.activateEditMode}>
                        {this.props.title}
                    </h3>:
                        <input
                            onKeyPress={this.confirmChangeOnEnter}
                            className={this.state.ifWarning}
                            autoFocus={true}
                            value={this.state.newTitle}
                            onChange={this.titleChange}
                            onBlur={this.deactivateEditMode}
                        />
                    }
                    <button className={style.deleteList} onClick={()=>{this.props.deleteList(this.props.id)}}>x</button>
                </div>
                <AddItem
                    itemFieldContent={this.props.taskFieldContent}
                    textHolder={this.props.textHolder}
                    addNewItem={this.props.addNewTask}
                />

            </div>

        );
    }
}

export default Header;

