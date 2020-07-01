import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    Col,
    NavItem
} from 'reactstrap';import axios from 'axios';
var dateFormat = require('dateformat');

class deactivate extends Component{
    state={
        empid:[],
        selectedid:'',
        boola:true,
        reason:'',
        Status:'inactive',
        UserAccess_Headerkey:'',
        Trans_Datetime:'',
        Trans_Type:"Deactivation"
    }

    handlechange=(value,event)=>{
        this.setState({
            selectedid:event.Emp_ID
        })
    }
    handlechange1=(event)=>{
        this.setState({
            reason:event.target.value
        })
    }
    getheader=()=>{
        var v='';
        axios.get('/api/items/key')
        .then(res=>{
            v=res.data[0][''];
            console.log(v);
            if(v==null){
               this.setState({
                   key:1
               })
            }
            else {
                v=v+1
                this.setState({
                    UserAccess_Headerkey:v
                },()=>{
                    this.handlesubmit();
                })
            }
        })
    }
    
    handlesubmit=(e)=>{
       var now=new Date();
      
      const newitem={

          Emp_ID:this.state.selectedid,
          Status:this.state.Status,
          reason:this.state.reason,
          Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
          UserAccess_Headerkey:this.state.UserAccess_Headerkey,
          Trans_Type:this.state.Trans_Type
      }
      console.log(this.state);
      axios.post('/api/deactivate/cont',newitem)
      .then(res=>{
          console.log(res);
      })
    }
    componentDidMount(){
        axios.get('/api/deactivate')
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
            <div className='container'>
            <Form>
              <Autocomplete
              id="deactivate"
              options={this.state.empid}
              getOptionLabel={(option)=>option.Emp_ID}
              filterOptions={filterOptions1}
              style={{width:300}}
              onChange={this.handlechange}
              renderInput={(params)=><TextField {...params} label="Delete" variant="outlined"/>}
              /><br></br>
              <FormGroup row>
                <Label for="exampleText"sm={1}>Reason</Label>
               <Col sm={5}>
                  <Input type="textarea" name="reason" id="reason" onChange={this.handlechange1}/>
                  </Col>
                 </FormGroup>
              <FormGroup row>
                  <Col sm={{ size: 6, offset: 1 }}>
                  <Button onClick={this.getheader}>Submit</Button>
                  </Col>
              </FormGroup>
            </Form>
            </div>
        )
    }
}

export default deactivate;