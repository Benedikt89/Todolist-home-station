import {todoListsAPI} from "../API/api";

const ADD_LIST = 'ADD_LIST';
const ADD_TASK = 'ADD_TASK';
const CHANGE_TASK = 'CHANGE_TASK';
const DELETE_LIST = 'DELETE_LIST';
const DELETE_TASK = 'DELETE_TASK';
const SET_LISTS = 'SET_LISTS';
const SET_TASKS = 'SET_TASKS';
const CHANGE_LIST = 'CHANGE_LIST';


const initialState = {
    lists: [],
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                lists: action.lists
            };
        case ADD_LIST:
            return {
                ...state,
                lists: [...state.lists, action.list],
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
        case SET_TASKS:
            return {
                ...state,
                lists: state.lists.map(l=>{
                    if (l.id === action.listId) {
                        return {
                            ...l,
                            tasks: action.tasks.sort((a, b)=>{return b.order-a.order})
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
                            tasks: l.tasks.map( t => {
                                if (t.id === action.newTask.id) {
                                    return action.newTask;
                                } else {
                                    return t;
                                }
                            })
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
        case CHANGE_LIST:
            return {
                ...state,
                lists: state.lists.map(l=>{
                    if (l.id === action.listId) {
                        return {
                            ...l,
                            title: action.title
                        }
                    }else {
                        return l;
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

const _deleteTask = (listId, taskId) => {
    return {
        type: DELETE_TASK, taskId, listId
    }
};

const _deleteList = (listId) => {
    return {
        type: DELETE_LIST,
        listId
    }
};
const _changeTask = (listId, newTask) => {
    return {
        type: CHANGE_TASK,
        newTask,
        listId
    }
};
const _addNewList = (list) => {
    return {
        type: ADD_LIST, list
    }
};
const _setLists = (lists) => {
    return {
        type: SET_LISTS, lists
    }
};
const _setTasks = (listId, tasks) => {
    return {
        type: SET_TASKS, listId, tasks
    }
};
const _addNewTask = (listId, newTask) => {
    return {
        type: ADD_TASK, newTask, listId
    }
};
export const deleteList = (listId) => (dispatch) => {
    todoListsAPI.deleteTodoList(listId)
        .then( code => {
            if (code === 0) {
                dispatch(_deleteList(listId));
            }
        })
};
export const deleteTask = (listId, taskId) => (dispatch) => {
    todoListsAPI.deleteTask(taskId)
        .then( code => {
            if (code === 0) {
                dispatch(_deleteTask(listId, taskId));
            }
        })
};
export const addNewList = (title) => (dispatch) => {
    todoListsAPI.addNewTodoList(title)
        .then( data => {
            dispatch(_addNewList(data.item));
        });
};
export const addNewTask = (listId, title) => (dispatch) => {
    todoListsAPI.addNewTask(listId, title)
        .then( data => {
            let task = data.data.item;
            dispatch(_addNewTask(listId, task));
        });
};

export const getLists = () => (dispatch) => {
    todoListsAPI.getLists()
        .then( data => {
            dispatch(_setLists(data));
        });
};
export const getTasks = (listId) => (dispatch, getState) => {
    todoListsAPI.getTasks(listId)
        .then( data => {
            dispatch(_setTasks(listId, data));
        });
};
export const changeTask = (listId, newTask) => (dispatch) => {
    todoListsAPI.changeTask(newTask)
        .then(res => {
            if(res.resultCode === 0){
                dispatch(_changeTask(listId, newTask))
            }
        })
};
export const changeList = (listId, title) => (dispatch) => {
    todoListsAPI.changeList(listId, title)
        .then(res=> {
            if (res.resultCode === 0){
                dispatch({type: CHANGE_LIST, title: title, listId});
            }
        })
};

export const reorder = (source, destination) => (dispatch, getState) => {
    const lists = getState().lists.filter(l =>  l.id === source.droppableId);
    const result = lists[0].tasks;
    const [removed] = result.splice(source.index, 1);
    result.splice(destination.index, 0, removed);

    result
        .forEach((t, index) => {
            if (index >= source.index || index >= destination.index) {
                dispatch(changeTask(source.droppableId, {...t, order: -index}));
            }
        });
};

export const moveTasks = (source, destination) => (dispatch, getState) => {
    const sourceClone = Array.from(getState().lists.filter(l =>  l.id === source.droppableId)[0].tasks);
    const destClone = Array.from(getState().lists.filter(l =>  l.id === destination.droppableId)[0].tasks);
    const [removed] = sourceClone.splice(source.index, 1);

    destClone.splice(destination.index, 0, removed);

    sourceClone.forEach( (t, index) => {
        if (index >= source.index || index >= destination.index) {
            dispatch(changeTask(source.droppableId, {...t, order: -index}));
        }
    });
    destClone.forEach((t, index) => {
        if (index >= source.index || index >= destination.index) {
            if (t.id === removed.id) {
                dispatch(changeTask(destination.droppableId, {
                    ...t, order: -index,
                    listId: destination.droppableId
                }));
            } else {
                dispatch(changeTask(destination.droppableId, {...t, order: -index}));
            }
        }
    });
};

    //
    // {addedDate: "2019-10-01T16:33:02.1501436Z"
    // id: "1d9d9554-2137-486c-afe9-5e4144cc07f8"
    // order: -1
    // title: "asd"
    // user: null
    // userId: 1572}


export default listReducer;