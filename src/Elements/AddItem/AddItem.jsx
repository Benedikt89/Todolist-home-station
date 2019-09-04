import React from 'react';
import style from './AddItem.module.css'


class AddItem extends React.Component {

    state = {
        fieldStyle: style.textField,
    };


    render = (props) => {

        let changeText = (e) => {
            let text = e.currentTarget.value;
            this.props.textHolder(text);
            if (text !== '') {
                this.setState({fieldStyle: style.textField});
            }
        };

        let addItem = () => {
            if (this.props.itemFieldContent === '') {
                this.setState({fieldStyle: style.error});
            } else {
                this.props.addNewItem();
            }
        };

        let addOnEnter = (e) => {
            if (e.key === 'Enter') {
                addItem();
            }
        };

        return (

                <div className={style.todoListNewTaskForm}>
                    <input
                        className={this.state.fieldStyle}
                        type="text"
                        placeholder="New name"
                        value={this.props.itemFieldContent}
                        onChange={changeText}
                        onKeyPress={addOnEnter}
                    />
                    <button onClick={addItem}>Add</button>
                </div>
        );
    }
}

export default AddItem;

