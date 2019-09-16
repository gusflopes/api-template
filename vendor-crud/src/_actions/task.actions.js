
import { Client } from '../_services/client.js';
import { userService } from '../_services/';
import { history } from '../_helpers';
import 'date-fns';
//import moment from 'moment';
//import { isSymbol } from 'util';
//import { useDebugValue, useState } from 'react';

export const taskAction = {
    getTask,
    getTaskById,
    onChangeProps,
    onChangeDate,
    editTaskInfo,
    createTask,
    deleteTaskById
};

function getTask(){
    return dispatch => {
    // aqui a gente cria uma nova instancia do client 
    const client = new Client("http://localhost:8001/api/v1/", err => {
        console.log("Error: ", err);
      });

      // isso... a parte do front eu gosto de validar o tempo... se estiver dentro do tempo faz a chamada e valida o jwt
      // se ja tiver passado o tempo, nem queima processamento do back e ja manda o cidadão pra area de login.

      // quando você for fazer o get de tasks, por exemplo, se vc implementar o client igual ta aqui e chamar ele, vai funcionar.

      // vou deixar ele comentado pro c, pq la na frente vc deve ter que usar isso... Esse validateJwt valida apenas o TEMPO que ele ainda tem.
      // Valida se o jwt ta valido... se não tiver te redireciona pro login
      //   if (!client.validateJwt()) {
      //     this.props.history.push("login");
      //   }
  
        client.get("tasks/", true).then((response)=> {
            dispatch(changeTasksList(response.data.data));
        }).catch((err)=>{
            console.log(err);
        });
   };
}
function createTask(payload){
    return dispatch => {
        let apiEndpoint = 'tasks/';
        userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            history.push('/task');
        })
    }
}
function getTaskById(id){
    return dispatch => {
        let apiEndpoint = 'tasks/details/'+ id;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editTasksDetails(response.data.data));
        })
    };
}
function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}
function onChangeDate(props){
    return dispatch =>{
        console.log("Estou no Task.Action", props)
        dispatch(handleOnChangeDate(props));
    }
}

function editTaskInfo(id, payload){
    return dispatch => {
        let apiEndpoint = 'tasks/'+ id;
        userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/task');
        })
    }
}
function deleteTaskById(id){
    return dispatch => {
        let apiEndpoint = 'tasks/'+ id;
        userService.deleteDetail(apiEndpoint)
        .then((response)=>{
             dispatch(deleteTasksDetails());
             dispatch(taskAction.getTask());
        })
    };
}
export function changeTasksList(task){
    return{
        type: "FETECHED_ALL_TASK",
        task: task
    }
}
export function handleOnChangeProps(props, value){
    console.log("testando!!");
    console.log();
    return{
        type: "HANDLE_ON_CHANGE",
        props: props,
        value: value
       
    }
}

export function handleOnChangeDate(props, value){
    console.log("PARTE FINAL do Task.Action");
    return{
        type: "HANDLE_ON_DATECHANGE",
        props: props,
        value: value
    }
}

export function editTasksDetails(task){
    return{
        type: "TASK_DETAIL",
        id: task._id,
        name: task.name,
        description: task.description,
        assignedTo: task.assignedTo,
        dueDate: task.dueDate
    }
}
export function updatedUserInfo(){
    return{
        type: "USER_UPDATED"
    }
}
export function createUserInfo(){
    return{
        type: "USER_CREATED_SUCCESSFULLY"
    }
}
export function deleteTasksDetails(){
    return{
        type: "DELETED_TASK_DETAILS"
    }
}