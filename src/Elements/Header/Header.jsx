import React from 'react';
import style from './Header.module.css'
import AddItem from "../AddItem/AddItem";


class Header extends React.Component {

    render = (props) => {

        return (
            <div className={style.todoListHeader}>
                <div className={'row'}>
                    <h3 className={style.todoListHeaderTitle}>{this.props.label}</h3>
                    <button className={style.deleteList} onClick={this.props.deleteList}>x</button>
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

