
import { Client } from '../_services/client.js';
import { userService } from '../_services/';
import { history } from '../_helpers';
import 'date-fns';
//import moment from 'moment';
//import { isSymbol } from 'util';
//import { useDebugValue, useState } from 'react';

export const processAction = {
    getProcess,
    getProcessById,
    onChangeProps,
    onChangeDate,
    editProcessInfo,
    createProcess,
    deleteProcessById
};

// Funções para fazer chamadas à API ###########################################

function getProcess(){
    return dispatch => {
    // aqui a gente cria uma nova instancia do client 
        const client = new Client("http://localhost:8001/api/v1/", err => {
            console.log("Error: ", err);
        });

        /* isso... a parte do front eu gosto de validar o tempo... se estiver dentro do tempo faz a chamada e valida o jwt
        se ja tiver passado o tempo, nem queima processamento do back e ja manda o cidadão pra area de login.
        quando você for fazer o get de processs, por exemplo, se vc implementar o client igual ta aqui e chamar ele, vai funcionar.
        vou deixar ele comentado pro c, pq la na frente vc deve ter que usar isso... Esse validateJwt valida apenas o TEMPO que ele ainda tem.
        Valida se o jwt ta valido... se não tiver te redireciona pro login */
        
        /*if (!client.validateJwt()) {
        this.props.history.push("login");
        }*/
    
        client.get("processos/join/", true).then((response)=> {
            dispatch(changeProcessesList(response.data.data));
        }).catch((err)=>{
            console.log(err);
        });
    };
}
function createProcess(payload){
    return dispatch => {
        let apiEndpoint = 'processos/';
        userService.post(apiEndpoint, payload)
        .then((response)=>{
            dispatch(createUserInfo());
            // Verificar aqui
            history.push('/process');
        })
    }
}
function getProcessById(id){
    return dispatch => {
        let apiEndpoint = 'processos/'+ id;
        userService.get(apiEndpoint)
        .then((response)=>{
            dispatch(editProcessesDetails(response.data.data));
        })
    };
}

function editProcessInfo(id, payload){
    return dispatch => {
        let apiEndpoint = 'processos/'+ id;
        userService.put(apiEndpoint, payload)
        .then((response)=>{
            dispatch(updatedUserInfo());
            history.push('/process');
        })
    }
}
function deleteProcessById(id){
    return dispatch => {
        let apiEndpoint = 'processos/'+ id;
        userService.deleteDetail(apiEndpoint)
        .then((response)=>{
             dispatch(deleteProcessesDetails());
             dispatch(processAction.getProcess());
        })
    };
}

// Passar os dados do registro que está sendo editado ##########################
export function editProcessesDetails(process){
    return{
        type: "PROCESS_DETAIL",
        id: process._id,
        pasta: process.pasta,
        numeroProcesso: process.numeroProcesso,
        cliente: process.cliente,
        tipo: process.tipo,
        status: process.status,
        propositura: process.propositura,
        juizo: process.juizo,
        comarca: process.comarca,
        tribunal: process.tribunal,
        observacoes: process.observacoes,
        
    }
}


// Lidar com o Render ##########################################################

function onChangeProps(props, event){
    return dispatch =>{
        dispatch(handleOnChangeProps(props, event.target.value));
    }
}
function onChangeDate(props){
    return dispatch =>{
        console.log("Estou no Process.Action", props)
        dispatch(handleOnChangeDate(props));
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
    console.log("PARTE FINAL do Process.Action");
    return{
        type: "HANDLE_ON_DATECHANGE",
        props: props,
        value: value
    }
}


// LIDAR COM AS RESPOSTAS DA API ###############################################

export function changeProcessesList(process){
    return{
        type: "FETCHED_ALL_PROCESS",
        process: process
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
export function deleteProcessesDetails(){
    return{
        type: "DELETED_PROCESS_DETAILS"
    }
}