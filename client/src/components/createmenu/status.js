import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container,ListGroup,ListGroupItem,Button,Table,Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {getEmpid,getHeaderkey} from '../../actions/itemActions';
import { Redirect,NavLink } from 'react-router-dom';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
var nodelink=require('../../nodelink.json');
var n=1
class Status extends Component{
    state={
        empid:[],
        selectid:'',
        approved:[],
        count:0,
        count2:''
    }
    handlechange = (values,event) => {
        var i=0;        // for combobox till the next @
        if(event!==null){
         var a=event.Emp_ID;
         console.log(a)
      this.setState({
        selectid: a
      })
      var hkey;
      while(i<this.state.empid.length){
          if(this.state.empid[i].Emp_ID==a){
              hkey=i;
              console.log(this.state.empid[i].UserAccess_Headerkey);
          }
          i++;
      }
      const info={
          UserAccess_Headerkey:this.state.empid[hkey].UserAccess_Headerkey
      }
      axios.post(nodelink.site+'/api/status',info)
      .then(res=>{
          this.setState({
              approved:res.data,
              count:0,
              count2:''
          })
          console.log(this.state.approved);
          var n;
          for(n=0;n<this.state.approved.length;n++){
              if(this.state.approved[n].Status=='AF        '){
                this.setState({
                    count2:'yes'
                })
            }
          }
          if(this.state.approved.length>0)
          {
              this.setState({
                  count:1
              })
          }
          else{
              this.setState({
                  count:2
              })
          }
      })
    }
}
    componentDidMount(){      
        axios.get(nodelink.site+'/api/status/stat')
        .then(res=>{
            this.setState({
               empid:res.data
            })
            console.log(this.state.empid)        
        })
    }
    render(){
        const filterOptions1 = createFilterOptions({   //for combo box till the next @
            matchFrom: 'start',
            stringify: (option) => option.Emp_ID,
          });
          const {approved}=this.state;

          const list1=(
              <Fragment>
                <h2>This is already been approved by:</h2>
                <Table striped>
                <thead>
                 <tr>
                 <th>Approver Name</th>
                 <th>On</th>
                </tr>
                  </thead>
                  {approved.map(({Approver_Name,Trans_Datetime})=>(
                      <tbody key={Trans_Datetime}timeout={500} >
                          <tr>
                              <th scope='row'>{Approver_Name}</th>
                              <td>{Trans_Datetime }</td>
                          </tr>
                          </tbody>

                  ))}
                </Table>
              </Fragment>
          )
        return(
            <div className='App' style={{marginTop:"200px", padding:"40px"}}>

                <Autocomplete
            id="EmpId"
            options={this.state.empid}
            getOptionLabel={(option)=>option.Emp_ID}
            renderOption={(option)=>(
                <React.Fragment>
                  {option.Emp_ID} - {option.Emp_Name}
                </React.Fragment>
              )}
            filterOptions={filterOptions1}
            style={{width:300}}
            onChange={this.handlechange}
            renderInput={(params)=><TextField {...params} label="Emp ID" variant="outlined"/>}
            />
           
                {this.state.count==1?list1:''}
                {this.state.count==2?<h2>Its not been approved by anyone yet.</h2>:''}
                {this.state.count2=='yes'?<h2>It's been successfully approved.</h2>:''}
            </div>
        )
    }
}

export default Status;