import {GET_empid,GET_headerkey,GET_oldkey,GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from '../actions/types';
import axios from 'axios';

export const getItems=()=>dispatch=>{
    dispatch(setItemsLoading());
    axios.get('/api/screens')
    .then(res=>dispatch({
        type:GET_ITEMS,
        payload: res.data
    })    
    )
};

export const getEmpid=(eid)=>dispatch=>{   
    dispatch({
        type:GET_empid,
        payload: eid
    })    
};

export const getHeaderkey=(hkey)=>dispatch=>{
    dispatch({
        type:GET_headerkey,
        payload: hkey
    })     
};

export const getOldkey=(okey)=>dispatch=>{
    dispatch({
        type:GET_oldkey,
        payload: okey
    })     
};


export const addItem2=(item)=>dispatch=>{
    axios.post('/api/screens',item)
    .then(res=>{
        return(res.data);
    })
}; 



export const deleteItem=(id)=>dispatch=>{
    axios.delete('/api/items/').then(res=> 
        dispatch({
            type:DELETE_ITEM,
            payload:id

        }))
 
};

export const addItem=(item)=>dispatch=>{
    axios.post('/api/items',item)
    .then(res=>dispatch({
        type:ADD_ITEM,
        payload:res.data
    }))
}; 

export const setItemsLoading=()=>{
    return{
        type:ITEMS_LOADING
    }
}