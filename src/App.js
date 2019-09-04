import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItem from "./Elements/AddItem/AddItem";
import Header from "./Elements/Header/Header";

class App extends React.Component {

    componentDidMount() {
        this.restoreState();
    }

    saveState = () => {
        let stateAsString = JSON.stringify(this.state);
        localStorage.setItem("lists-state", stateAsString);
    };
    restoreState = () => {
        let state = {
            lists: [
                {id: 1,title: 'today'},
            ],
            textField: '',
        };

        let stateAsString = localStorage.getItem("lists-state");
        if (stateAsString != null) {
            state = JSON.parse(stateAsString);
        }
        this.setState(state);
    };

    state = {
        lists: [
            {id: 1,title: 'today',},
        ],

        textField: '',
    };

    addNewList = () => {
        let newList = {
            id: this.state.lists.length +1,
            title: this.state.textField,
        };
        let newLists = [newList, ...this.state.lists];

        this.setState({lists: newLists, textField: ''}, ()=> { this.saveState(); });
    };

    textHolder = (text) => {
        let newText = text;
        this.setState({textField: newText}, () => { this.saveState() });
    };

    render = () => {

        let todoLists = this.state.lists.map(l => <TodoList label={l.title} id={l.id} />);

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

export default App;

