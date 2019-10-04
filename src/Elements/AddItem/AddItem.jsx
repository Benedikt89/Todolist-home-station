import React from 'react';
import style from './AddItem.module.css'


class AddItem extends React.Component {

    state = {
        fieldStyle: style.textField,
        newItemTitle: '',
    };
    changeText = (e) => {
        let text = e.currentTarget.value;
        this.setState({newItemTitle: text});
        if (text !== '') {
            this.setState({fieldStyle: style.textField});
        }
    };
    addItem = () => {
        if (this.state.newItemTitle === '') {
            this.setState({fieldStyle: style.error});
        } else {
            this.props.addNewItem(this.state.newItemTitle);
            this.setState({newItemTitle: ''})
        }
    };
    addOnEnter = (e) => {
        if (e.key === 'Enter') {
            this.addItem();
        }
    };
    render = (props) => {

        return (

                <div className={style.todoListNewTaskForm}>
                    <input
                        className={this.state.fieldStyle}
                        type="text"
                        placeholder="New name"
                        value={this.state.newItemTitle}
                        onChange={this.changeText}
                        onKeyPress={this.addOnEnter}
                    />
                    <button onClick={this.addItem}>Add</button>
                </div>
        );
    }
}

export default AddItem;

