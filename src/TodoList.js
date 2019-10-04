import React from 'react';
import './App.css';
import Footer from "./Elements/Footer/Footer";
import Header from "./Elements/Header/Header";
import TodoTasks from "./Elements/Tasks/TodoTasks";
import {addNewTask, changeTask, deleteList, deleteTask, getTasks, changeList} from "./Redux/listsReducer";
import {connect} from "react-redux";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getTasks(this.props.id)
    }
    _saveState = () => {
       let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state"+this.props.id, stateAsString);
    };
    _restoreState = () => {
        let state = {
            tasks: this.props.tasks,

            textField: '',
            filterValue: 'All',
        };

        let stateAsString = localStorage.getItem("our-state"+this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };

    state = {
        selectedFilter: 'All',
    };

    changeTask =(taskId, obj) => {
        let newTask = this.props.tasks.find(task => {
            if (task.id === taskId) {
                return task;
            }});
        newTask = {...newTask, ...obj};
        this.props.changeTask(this.props.id, newTask);
    };

    changeStatus = (completed, taskId) =>{
        this.changeTask(taskId, {completed: completed});
    };

    buttonFilter = (text) => {
        let newFilter = text;
        this.setState({selectedFilter: newFilter});
    };

    addNewTask = (text) => {
        this.props.addNewTask(this.props.id, text);
    };

    changeTitle = (text, taskId, targetType) => {
        if (targetType === 'list') {
            this.props.changeList(taskId, text)
        } else if (targetType === 'task') {
            this.changeTask(taskId, {title: text});
        }
    };

    render = () => {

        let tasks = this.props.tasks === undefined ? [] : this.props.tasks;
        return (

                <div className="todoList">
                    <Header
                        deleteList={this.props.deleteList}
                        title={this.props.title}
                        id={this.props.id}
                        addNewTask={this.addNewTask}
                        changeTitle={this.changeTitle}

                    />

                    <TodoTasks
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        deleteTask={(taskId)=>{this.props.deleteTask(this.props.id, taskId)}}
                        tasks={tasks.filter(t => {

                    if (this.state.selectedFilter === 'Active') {
                        return t.completed === false;
                    }else if (this.state.selectedFilter === 'Completed') {
                        return t.completed === true;
                    } else{
                        return true;
                    }
                    })}
                        />
                    <Footer
                        buttonFilter={this.buttonFilter}
                        selectedFilter={this.state.selectedFilter}/>
                </div>


        );
    }
}

const ConnectedTodoList = connect(null, {deleteList, addNewTask, changeTask, deleteTask, getTasks, changeList})(TodoList);

export default ConnectedTodoList;


