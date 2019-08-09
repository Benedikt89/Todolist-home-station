import React from 'react';
import style from './Header.module.css'


class Header extends React.Component {

    state= {
        fieldStyle: style.textField,
    };


    render = (props) => {

        let changeText = (e) => {
            let text = e.currentTarget.value;
            this.props.textHolder(text);
            if (text != '') {
                this.setState({fieldStyle: style.textField});
            }
        };

        let addClick = () => {
            if (this.props.taskFieldContent === '') {
                this.setState({fieldStyle: style.error});
            } else {

                this.props.addNewTask();
                console.log('click')
            }
        };

        let inputOnEnter = (e) => {

            if (e.key === 'Enter') {
                addClick();
            }
        };

        return (
            <div className={style.todoListHeader}>
                <h3 className={style.todoListHeaderTitle}>What to Learn</h3>
                <div className={style.todoListNewTaskForm}>
                    <input
                        className={this.state.fieldStyle}
                        type="text"
                        placeholder="New task name"
                        value={this.props.taskFieldContent}
                        onChange={changeText}
                        onKeyPress={inputOnEnter}
                    />
                    <button onClick={addClick}>Add</button>
                </div>
            </div>

        );
    }
}

export default Header;

