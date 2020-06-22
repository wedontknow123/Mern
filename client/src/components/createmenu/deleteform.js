import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import {Button} from 'reactstrap';
import axios from 'axios';

class delete1 extends Component{
    state={
        empid:[],
        selectid:'',
        boola: true
    }

     handlechange=(value,event)=>{
         this.setState({
             selectid:event.Emp_ID,
             boola:false
         })
     }
    handlesubmit=(value,event)=>{
        const new1={
            Emp_ID:this.state.selectid
        };
        axios.post('/api/items/delete',new1)
        .then(res=>{
            console.log(res);
        })
    }
    componentDidMount(){
        axios.get('/api/items/del')
        .then(res=>{
            this.setState({
                empid:res.data
            })
        })
    }

    render(){
        const filterOptions1 = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.Emp_ID,
          });
        return(
            <div className="container">
            <Autocomplete
            id="delete"
            options={this.state.empid}
            getOptionLabel={(option)=>option.Emp_ID}
            filterOptions={filterOptions1}
            style={{width:300}}
            onChange={this.handlechange}
            renderInput={(params)=><TextField {...params} label="Delete" variant="outlined"/>}
            /><br></br>
            <Button type="button" onClick={this.handlesubmit} disabled={this.state.boola}>Delete</Button>

            </div>
        )
    }
}

export default delete1 ;