import axios from 'axios';
import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from '../actions/types';
import {returnErrors} from './errorActions';
var nodelink=require('../nodelink.json');
export const loadUser=()=>(dispatch, getState)=>{
    dispatch({type:USER_LOADING});

    axios.get(nodelink.site+'/api/auth/user',tokenConfig(getState))
    .then(res=>dispatch({
        type:USER_LOADED,
        payload:res.data
    }))
    .catch(err=>{
        dispatch(returnErrors(err.response.data,err.response.status));
        dispatch({
            type:AUTH_ERROR
        });
    });
};

export const register=({name,email,password})=>dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }


    const body=({name,email,password});

    axios.post(nodelink.site+'/api/users',body,config)
    .then(res=>{console.log(res);
        dispatch({
        type:REGISTER_SUCCESS,
        payload:res.data
    })})
    .catch(err=>{
        console.log(err);
        dispatch(returnErrors(err.response.data,err.response.status,'REGISTER_FAIL'));
        dispatch({
            type:REGISTER_FAIL
            });
    });
}

export const login=({email,password})=>dispatch=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body=({email,password});

    axios.post(nodelink.site +'/api/auth',body,config)
    .then(res=>dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data
    }))
    .catch(err=>{
        console.log(err);
        dispatch(returnErrors(err.response.data,err.response.status,'LOGIN_FAIL'));
        dispatch({
            type:LOGIN_FAIL
            });
    });
}



export const logout=()=>{
     return{
       type: LOGOUT_SUCCESS
     };
};

export const tokenConfig=getState=>{
    
    const token=getState().auth.token;

    const config={
        headers:{
            "Content-type":"application/json"
        }
    }

    if(token){
        config.headers['x-auth-token']=token;
    }
    return config;
}