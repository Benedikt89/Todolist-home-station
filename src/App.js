import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItem from "./Elements/AddItem/AddItem";
import {addNewListAC} from "./Redux/listsReducer";
import { connect } from 'react-redux'

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let state = {
            lists: this.props.lists,
            textField: '',
        };
        let stateAsString = JSON.stringify(state);
        localStorage.setItem("lists-state", stateAsString);
    };
    restoreState = () => {
        let state = {
            lists: this.props.lists,
            textField: '',
        };

        let stateAsString = localStorage.getItem("lists-state");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };

    state = {
        textField: '',
    };

    addNewList = () => {
        this.props.addNewListF(this.state.textField);

        this.setState({textField: ''}, ()=> { this.saveState(); });
    };

    textHolder = (text) => {
        let newText = text;
        this.setState({textField: newText}, () => { this.saveState() });
    };

    render = () => {
        let todoLists = this.props.lists.map(l => <TodoList label={l.title} id={l.id} tasks={l.tasks} />);
        return (


            <div className="">
                <header>
                    <AddItem
                        itemFieldContent={this.state.textField}
                        textHolder={this.textHolder}
                        addNewItem={this.addNewList}
                    />
                </header>

                <div className="App">
                    {todoLists}
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        lists: state.lists,
    }};
const mapDispatchToProps = (dispatch) => {
    return{
        addNewListF: (textField) => {dispatch(addNewListAC(textField))},
    }};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;