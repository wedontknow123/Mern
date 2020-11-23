import {GET_Department,GET_reason,send_for_approval,GET_empid,GET_headerkey,GET_oldkey,GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from '../actions/types';
import axios from 'axios';
var nodelink=require('../nodelink.json');
export const getItems=()=>dispatch=>{
    dispatch(setItemsLoading());
    axios.get(nodelink.site+'/api/screens')
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

export const getReason=(reason)=>dispatch=>{
    dispatch({
        type:GET_reason,
        payload: reason
    })     
};

export const getdepartment=(department)=>dispatch=>{
    dispatch({
        type:GET_Department,
        payload: department
    })     
};

export const getOldkey=(okey)=>dispatch=>{
    dispatch({
        type:GET_oldkey,
        payload: okey
    })     
};

export const approval1=(info)=>dispatch=>{
     axios.post(nodelink.site+'/api/apmaster/submit',info)
     .then(res=>{
         console.log("now submitted approval data to master");
     })
};

export const getapprovalinfo=(info)=>dispatch=>{
    axios.post(nodelink.site+'/api/apmaster',info)
    .then(res=>{console.log("now getting approval info",res.data[0].Approver_Name)//res.data[0].Approver_Name
        dispatch({
        type:send_for_approval,
        payload:res.data
    })})
};


export const approval2=(info)=>dispatch=>{
    axios.post(nodelink.site+'/api/apmaster/approval',info)
    .then(res=>{
        console.log(res);
    })
};

export const addItem2=(item)=>dispatch=>{
    axios.post(nodelink.site+'/api/screens',item)
    .then(res=>{
        return(res.data);
    })
}; 



export const deleteItem=(id)=>dispatch=>{
    axios.delete(nodelink.site+'/api/items/').then(res=> 
        dispatch({
            type:DELETE_ITEM,
            payload:id

        }))
 
};

// export const addItem=(item)=>dispatch=>{
//     //axios.post('/api/items',item)
//     //.then(res=>{console.log(res)        
//     //console.log("now saving newuserform")
//         dispatch({
//         type:ADD_ITEM,
//         payload: "lol"
//     })//})res.data
// }; 

export const setItemsLoading=()=>{
    return{
        type:ITEMS_LOADING
    }
}