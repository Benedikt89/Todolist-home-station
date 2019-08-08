import React from 'react';
import './App.css';
import Footer from "./Footer";
import Header from "./Header";
import TodoTasks from "./TodoTasks";
import TodoTask from "./TodoTask";

class App extends React.Component {

    state = {
        tasks: [
            {title: 'CSS', isDone: false},
            {title: 'html', isDone: true},
            {title: 'react', isDone: false},
        ],

        textField: '',

        selectedFilter: 'All',
    };

//     let newUsers = [];
//
//     this.names.map((name, index) => {
//     let user = {name: name, age: this.ages[index]}
//     newUsers.push(user)
// })
//
// let usersList = newUsers.map(n => <p>`User {n.name} is years {n.age} old.`</p>)


changeStatus = (input) =>{
        let newTasks = this.state.tasks.map( task => {
                // eslint-disable-next-line no-unused-expressions
        if (task.title === input.title) {task.isDone === true ? task.isDone === false : task.isDone === true}
        }
        );

console.log(newTasks);
        console.log(input);

        this.setState({tasks: newTasks});
    };

    textHolder = (text) => {
        let newText = text;
        this.setState({textField: newText})
    };

    buttonFilter = (text) => {
        let newFilter = text;
        console.log(this.state.selectedFilter);
        this.setState({selectedFilter: newFilter})
    };

    addNewTask = () => {
        let newTask = {
            title: this.state.textField,
            isDone: false
        };
        let newTasks = [...this.state.tasks, newTask];
        this.setState({tasks: newTasks});
        console.log('task added');
        this.state.textField = '';
    };

    render = () => {


        return (


            <div className="App">

                <div className="todoList">
                    <Header
                        textHolder={this.textHolder}
                        addNewTask={this.addNewTask}
                    />

                    <TodoTasks

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

