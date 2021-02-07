import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItem from "./Elements/AddItem/AddItem";
import {addNewList, getLists, moveTasks, reorder} from "./Redux/listsReducer";
import { connect } from 'react-redux'
import {DragDropContext} from "react-beautiful-dnd";

class App extends React.Component {

    componentDidMount() {
        this.props.getLists();
    }

    addNewList = (title) => {
        this.props.addNewList(title);
    };

    deleteList = () => {

    };

    onDragEnd = result => {
        const {source, destination, draggableId} = result;


        if (!destination) {
            return;
        }
        if (source.droppableId === destination.droppableId) {
            this.props.reorder(source, destination);

        } else {
            this.props.moveTasks(
                source,
                destination
            );
        }
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
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <div className="App">
                        {todoLists}
                    </div>
                </DragDropContext>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        lists: state.lists,
    }};

const ConnectedApp = connect(mapStateToProps, {addNewList, getLists, moveTasks, reorder})(App);

export default ConnectedApp;