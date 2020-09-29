import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import {Button} from 'reactstrap';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

var n = 1
var nodelink=require('../../nodelink.json');
class deleteform extends Component{
    state={
        empid:[],
        selectid:'',
        useremail:"",
        r : "",
        boola: true
    }
    static propTypes={
        auth:PropTypes.object.isRequired
      }

     handlechange=(value,event)=>{
         this.setState({
             selectid:event.Emp_ID,
             boola:false
         })
     }
    handlesubmit=(value,event)=>{
      document.getElementById("delete").disabled=true;
        const new1={
            Emp_ID:this.state.selectid
        };
        axios.post(nodelink.site+'/api/items/delete',new1)
        .then(res=>{
            console.log(res);
        })
    }
    componentDidMount(){
        // axios.get('/api/items/del')
        // .then(res=>{
        //     this.setState({
        //         empid:res.data
        //     })
        // })
    }

    componentDidUpdate(prevProps){
        if(this.state.r === ""){
          if(this.props.auth.user !== null){
            //console.log(this.props)
            if(this.state.useremail===""){
              var e = this.props.auth.user.Email
              console.log(e)
              this.setState({
                  useremail: this.props.auth.user.Email
                }) 
              console.log(this.state.useremail)} 
            else if(n==1){ 
              console.log(this.props)
              axios.post(nodelink.site+'/api/items/del',this.state)
                .then(res=>{
                this.setState({
                    empid:res.data,
                    r : "yes"
                })
                  console.log(this.state.items)
                  console.log(this.state)//}                       
                })
                n = n+1
            }
          }
      }
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
            <Button type="button" onClick={this.handlesubmit} disabled={this.state.boola} id="delete">Delete</Button>

            </div>
        )
    }
}

const mapStateToProps=state=>({
    item:state.item.items,
    hkey:state.item.hkey,
    eid:state.item.eid,
    auth:state.auth,
    // uemail:state.auth.user
  });
  
    export default connect(mapStateToProps)( deleteform) ;