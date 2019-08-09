import React from 'react';
import './App.css';
import Footer from "./Elements/Footer/Footer";
import Header from "./Elements/Header/Header";
import TodoTasks from "./Elements/Tasks/TodoTasks";
import TodoTask from "./Elements/Tasks/TodoTask";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("our-state", stateAsString);
    };

    restoreState = () => {
        let state = {
            tasks: [],

            textField: '',
            filterValue: 'All',
        };

        let stateAsString = localStorage.getItem("our-state");
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
        tasks: [
            // {id: 0,title: 'CSS', isDone: true, priority: 'low'},
            // {id: 1,title: 'html', isDone: true, priority: 'low'},
            // {id: 2,title: 'react', isDone: false, priority: 'Hi'},
            // {id: 3,title: 'JS', isDone: false, priority: 'Regular'},
        ],

        textField: '',

        selectedFilter: 'All',
    };

    changeTask =(taskId, obj) => {

        let newTasks = this.state.tasks.map(task => {
            if (task.id!=taskId) {
                return task;
            }
            else {
                return {...task, ...obj};
            }
        });

        this.setState({tasks: newTasks}, () => { this.saveState(); });
    };

    changeStatus = (isDone, taskId) =>{
        this.changeTask(taskId, {isDone: isDone});
    };

    textHolder = (text) => {
        let newText = text;
        this.setState({textField: newText}, () => { this.saveState(); });
    };

    buttonFilter = (text) => {
        let newFilter = text;
        this.setState({selectedFilter: newFilter}, () => { this.saveState(); });
    };

    addNewTask = () => {
        let newTask = {
            id: this.state.tasks.length +1,
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


            <div className="App">

                <div className="todoList">
                    <Header
                        textHolder={this.textHolder}
                        taskFieldContent={this.state.textField}
                        addNewTask={this.addNewTask}
                        clearState={this.clearState}
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

            </div>
        );
    }
}

export default App;

