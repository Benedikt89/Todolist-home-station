import React from 'react';
import './App.css';
import Footer from "./Elements/Footer/Footer";
import Header from "./Elements/Header/Header";
import TodoTasks from "./Elements/Tasks/TodoTasks";

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
            tasks: [],

            textField: '',
            filterValue: 'All',
        };

        let stateAsString = localStorage.getItem("our-state"+this.props.id);
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };

    clearState = () => {
        let state = {
            tasks: [],
            textField: '',
            filterValue: 'All',
        };
        alert('cleared');
        this.setState(state,()=> { this.saveState(); });
    };

    state = {
        tasks: [],

        textField: '',

        selectedFilter: 'All',
    };

    changeTask =(taskId, obj) => {
        let newTasks = this.state.tasks.map(task => {
            if (task.id !== taskId) {
                return task;
            }
            else {
                return {...task, ...obj};
            }
        });
        this.setState({tasks: newTasks}, () => { this.saveState() });
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
        let idS = this.state.tasks.map(t => t.id).sort(function(a,b){
            return a - b
        });
        let freeId = 0;
        for (freeId; freeId < this.state.tasks.length +2; freeId++){
           if (freeId + 1 !== idS[freeId]) {
               break;
           }
        }
        let newTask = {
            id: freeId +1,
            title: this.state.textField,
            isDone: false,
            priority: 'low'
        };
        let newTasks = [newTask, ...this.state.tasks];

        this.setState({tasks: newTasks, textField: ''}, ()=> { this.saveState(); });

   //     this.setState( {textField: ''});

    };

    changeTitle = (text, taskId) => {
        this.changeTask(taskId, {title: text});
    };

    render = () => {


        return (

                <div className="todoList">
                    <Header
                        label={this.props.label}
                        textHolder={this.textHolder}
                        taskFieldContent={this.state.textField}
                        addNewTask={this.addNewTask}
                    />

                    <TodoTasks
                        changeTitle={this.changeTitle}
                        isDoneBox={this.changeStatus}
                        tasks={this.state.tasks.filter(t => {

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

export default TodoList;

