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

    addNewList = (title) => {
        this.props.addNewList(title);
    };

    deleteList = () => {

    };

    render = () => {
        let todoLists = this.props.lists.map(l => <TodoList key={l.id} title={l.title} id={l.id} tasks={l.tasks ? l.tasks : []} />);
        return (

            <div className="">
                <header>
                    <AddItem
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