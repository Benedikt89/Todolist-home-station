import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItem from "./Elements/AddItem/AddItem";
import {addNewList, getLists} from "./Redux/listsReducer";
import { connect } from 'react-redux'

class App extends React.Component {

    componentDidMount() {
        this.props.getLists();
    }
    _saveState = () => {
        let state = {
            lists: this.props.lists,
            textField: '',
        };
        let stateAsString = JSON.stringify(state);
        localStorage.setItem("lists-state", stateAsString);
    };
    _restoreState = () => {
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
        this.props.addNewList(this.state.textField);
        this.setState({textField: ''});
    };

    deleteList = () => {

    };

    textHolder = (text) => {
        this.setState({textField: text});
    };

    render = () => {
        let todoLists = this.props.lists.map(l => <TodoList label={l.title} id={l.id} tasks={l.tasks ? l.tasks : []} />);
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

const ConnectedApp = connect(mapStateToProps, {addNewList, getLists})(App);

export default ConnectedApp;