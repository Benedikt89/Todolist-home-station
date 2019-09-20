import React from 'react';
import './App.css';
import Footer from "./Elements/Footer/Footer";
import Header from "./Elements/Header/Header";
import TodoTasks from "./Elements/Tasks/TodoTasks";
import {addNewTaskAC, changeTaskAC, deleteListAC, deleteTaskAC} from "./Redux/listsReducer";
import {connect} from "react-redux";

class TodoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState();
    }
    saveState = () => {
       let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state"+this.props.id, stateAsString);
    };
    restoreState = () => {
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
        tasks: this.props.tasks,

        textField: '',

        selectedFilter: 'All',
    };

    changeTask =(taskId, obj) => {
        let newTasks = this.props.tasks.map(task => {
            if (task.id !== taskId) {
                return task;
            }
            else {
                return {...task, ...obj};
            }
        });
        this.props.changeTaskF(newTasks, this.props.id);
    };

    changeStatus = (isDone, taskId) =>{
        this.changeTask(taskId, {isDone: isDone});
    };

    textHolder = (text) => {
        let newText = text;
        this.setState({textField: newText}, () => { this.saveState() });
    };

    buttonFilter = (text) => {
        let newFilter = text;
        this.setState({selectedFilter: newFilter}, () => { this.saveState() });
    };

    addNewTask = () => {
        let idS = this.props.tasks.map(t => t.id).sort(function(a,b){
            return a - b
        });
        let freeId = 0;
        for (freeId; freeId < this.props.tasks.length +2; freeId++){
            if (freeId + 1 !== idS[freeId]) {
                break;
            }
        }
        let newTask = {
            id: freeId + 1,
            title: this.state.textField,
            isDone: false,
            priority: 'low'
        };
        this.props.addNewTaskF(newTask, this.props.id);
        this.setState({textField: ''});
    };

    changeTitle = (text, taskId) => {
        this.changeTask(taskId, {title: text});
    };

    render = () => {

        return (

                <div className="todoList">
                    <Header
                        deleteList={()=>{this.props.deleteList(this.props.id)}}
                        label={this.props.label}
                        textHolder={this.textHolder}
                        taskFieldContent={this.state.textField}
                        addNewTask={this.addNewTask}
                    />

                    <TodoTasks
                        changeTitle={this.changeTitle}
                        isDoneBox={this.changeStatus}
                        deleteTask={(taskId)=>{this.props.deleteTask(taskId, this.props.id)}}
                        tasks={this.props.tasks.filter(t => {

                    if (this.state.selectedFilter === 'Active') {
                        return t.isDone === false;
                    }else if (this.state.selectedFilter === 'Completed') {
                        return t.isDone === true;
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


const mapDispatchToProps = (dispatch) => {
    return{
        deleteList: (listId) => {dispatch(deleteListAC(listId))},
        addNewTaskF: (newTask, listId) => {dispatch(addNewTaskAC(newTask, listId))},
        changeTaskF: (newTasks, listId) => {dispatch(changeTaskAC(newTasks, listId))},
        deleteTask: (taskId, listId) => {dispatch(deleteTaskAC(taskId, listId))},
    }};

const ConnectedTodoList = connect(null, mapDispatchToProps)(TodoList);

export default ConnectedTodoList;


