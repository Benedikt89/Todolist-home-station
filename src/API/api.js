import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/",
    withCredentials: true,
    headers: {"API-KEY": "0f32e29f-2408-4879-8199-f94cc9bd7861"},
});

export const todoListsAPI = {
    getLists () {
        return instance.get("todo-lists")
            .then(res => {
                if (res.status === 200) {
                    return res.data;
                }
            })
    },
    getTasks (todoListId) {
        return instance.get(`todo-lists/${todoListId}/tasks`)
            .then(res => {
                if (res.data.items){
                    return res.data.items;
                }
            })
    },
    addNewTodoList(title){
        return instance.post("todo-lists", {title: title})
            .then(res => {
                if (res.data.resultCode === 0) {
                    return res.data.data;
                }
            })
    },
    deleteTodoList(todoListId){
        return instance.delete(`todo-lists/${todoListId}`)
            .then( res => {
                if (res.data.resultCode === 0) {
                    return res.data.resultCode;
                }
            })
    },
    addNewTask(todoListId, taskTitle){
        return instance.post(`todo-lists/${todoListId}/tasks`, {title: taskTitle})
            .then(res => {
                if (res.data.resultCode === 0) {
                    return res.data;
                }
            })
    },
    deleteTask(taskId){
        return instance.delete(`todo-lists/tasks/`+taskId)
            .then( res => {
                return res.data.resultCode
            })
    },
    changeTask(task){
        return instance.put(`todo-lists/tasks/`, task)
            .then(res => {
                    return res.data;
            })
    },
};