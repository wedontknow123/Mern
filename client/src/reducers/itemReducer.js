import {GET_Department,send_for_approval,GET_empid,GET_oldkey,GET_headerkey,GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from '../actions/types';
const initialState={
    items:[],
    eid:"",
    hkey:"",
    okey:"",
    loading:false,
    approver_name:'',
    approver_email:'',
    department:''
};

export default function(state=initialState, action){
    switch(action.type){
        case send_for_approval:
            console.log(action.payload)
            return{
                ...state,
                approver_name:action.payload[0].Approver_Name,
                approver_email:action.payload[0].Email
            };
        case GET_Department:
            return{               
                    ...state,
                    department:action.payload
            };
        case GET_empid:
            return{               
                ...state,
                eid:action.payload,
                loading:false
            };
        case GET_headerkey:
        return{
            
            ...state,
            hkey:action.payload,
            loading:false
        };
        case GET_oldkey:
        return{
            
            ...state,
            okey:action.payload,
            loading:false
        };
        case GET_ITEMS:
            return{
                
                ...state,
                items:action.payload,
                loading:false
            };
        case DELETE_ITEM:
            return{
                ...state,
                items:state.items.filter(item=>item.id!==action.payload)
            };
        case ADD_ITEM:
                return{
                    ...state,
                    items:[ ...state.items,action.payload]
                };
        case ITEMS_LOADING:
            return{
                ...state,
                loading:true
            };
        default:
            return state;
    }
}