
const ADD_LIST = 'ADD_LIST';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK = 'CHANGE_TASK';
const DELETE_LIST = 'DELETE_LIST';
const DELETE_TASK = 'DELETE_TASK';

const initialState = {
    lists: [
        {id: 1,title: 'today', tasks: [{
                id: 1,
                title: 'initial',
                isDone: false,
                priority: 'low'
            }]},
        {id: 2,title: 'toy', tasks: [{
                id: 1,
                title: 'initial',
                isDone: false,
                priority: 'low'
            }]},
    ],
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_LIST:
            let newList = {
                id: state.lists.length +1,
                title: action.textField,
                tasks: []
            };
            return {
                ...state,
                lists: [...state.lists, newList],
            };
        case ADD_TASK:
            return {
                ...state,
                lists: state.lists.map(l=>{
                    if (l.id === action.listId) {
                        return {
                            ...l,
                            tasks: [action.newTask, ...l.tasks]
                        }
                    } else {
                        return l
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state,
                lists: state.lists.map(l=>{
                    if (l.id === action.listId) {
                        return {
                            ...l,
                            tasks: action.newTasks
                        }
                    } else {
                        return l
                    }
                })
            };
        case DELETE_LIST:
            return {
                ...state,
                lists: state.lists.filter(l=>{
                    if (l.id !== action.listId) {
                        return l
                    }
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                lists: state.lists.map(l=>{
                    if (l.id === action.listId) {
                        return {
                            ...l,
                            tasks: l.tasks.filter( t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                }
                            })
                        }
                    } else {
                        return l
                    }
                })
            };
        default:
            return state;
    }
};

export const deleteTaskAC = (taskId, listId) => {
    return {
        type: DELETE_TASK,
        taskId: taskId,
        listId: listId
    }
};

export const deleteListAC = (listId) => {
    return {
        type: DELETE_LIST,
        listId: listId
    }
};
export const changeTaskAC = (newTasks, listId) => {
    return {
        type: CHANGE_TASK,
        newTasks: newTasks,
        listId: listId
    }
};
export const addNewListAC = (textField) => {
    return {
        type: ADD_LIST, textField: textField
    }
};
export const addNewTaskAC = (newTask, listId) => {
    return {
        type: ADD_TASK, newTask: newTask, listId: listId
    }
};

export default listReducer;