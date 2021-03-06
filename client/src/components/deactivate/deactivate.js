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
    NavItem,
    Breadcrumb, BreadcrumbItem

} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

var dateFormat = require('dateformat');
var n =1
var nodelink=require('../../nodelink.json');

class Deactivate extends Component{
    state={
        empid:[],
        selectedid:'',
        boola:true,
        reason:'',
        reasonl:'',
        Status:'inactive',
        UserAccess_Headerkey:'',
        Trans_Datetime:'',
        useremail :"",
        r : "" ,
        done:"",
        Trans_Type:"Deactivation"
    }

    handlechange=(value,event)=>{
        this.setState({
            selectedid:event.Emp_ID,
            boola:false
        })
    }
    handlechange1=(e)=>{
        const { name, value } = e.target;
        let reasonl = this.state.reasonl;   
        switch (name) {            
            case 'reason': 
                reasonl = `${value.length}/150`                
                break;                
            default:
                break;
        }    
        this.setState({reasonl, [name]: value})    
    }

    static propTypes={
        auth:PropTypes.object.isRequired
    }
    getheader=()=>{
        if(this.state.reason.length==0){//
            alert("Fill all the * (Required) fields !")
           }
        else{
            if(window.confirm('Are you sure you want to DEACTIVATE this user ?')){
                var v='';
                axios.get(nodelink.site+'/api/items/key')
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
                            document.getElementById("submit").disabled=true;
                            this.handlesubmit();
                        })
                    }
                })
            }
            else{
                document.getElementById("submit").disabled=false;
            }            
        }
    }
    
    handlesubmit=(e)=>{
       var now=new Date();
       
      const newitem={

          Emp_ID:this.state.selectedid,
          Status:this.state.Status,
          reason:this.state.reason,
          Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
          UserAccess_Headerkey:this.state.UserAccess_Headerkey,
          Trans_Type:this.state.Trans_Type,
          User_Email:this.props.auth.user.Email

      }
      console.log(this.state);
      axios.post(nodelink.site+'/api/deactivate/cont',newitem)
      .then(res=>{
          this.setState({
              done:"yes"
          })
          console.log(res);
      })
    }
    componentDidMount(){
        // axios.get('/api/deactivate')
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
            axios.post(nodelink.site+'/api/deactivate',this.state)
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
          if(this.state.done=='yes'){
            console.log("ALL DONEE!!!")
            alert("Successfully deactivated")
            return (
            <Redirect to='/'/>
            )
          }
        return(
            <div className='container'>
                <Breadcrumb style={{marginTop:'105px',marginBottom:'50px'}}>
                <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                 <BreadcrumbItem active>Deactivate</BreadcrumbItem>
                 </Breadcrumb>
            <Form>   
                <FormGroup row> 
                <Label for="exampleText"sm={3}>Emp ID<span className="required" style={{color:'red',fontSize:'20px'}}>*</span>:</Label>
                    <Col sm={5}>       
              <Autocomplete
              id="deactivate"
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
              renderInput={(params)=><TextField {...params} label="Deactivate" variant="outlined"/>}
              />
              </Col>
              </FormGroup> 
              <br></br>
              <FormGroup row>
                    <Label for="exampleText"sm={3}>Reason<span className="required" style={{color:'red',fontSize:'20px'}}>*</span>:</Label>
                    <Col sm={5}>
                    <Input type="textarea" name="reason" id="reason" disabled={this.state.boola} maxLength='150' onChange={this.handlechange1}/>
                    {this.state.reason.length > 0 && <span className='error' style={{color:"red"}}>{this.state.reasonl}</span>}
                    </Col>
              </FormGroup>
              <FormGroup row>
                  <Col sm={{ size: 6, offset: 1 }}>
                  <Button onClick={this.getheader} disabled={this.state.boola} id="submit">Submit</Button>
                  </Col>                  
              </FormGroup>
              <Label style={{color:'red',fontSize:'20px' }} >* Required</Label>
            </Form>            
            </div>
        )
    }
}
const mapStateToProps=state=>({
    auth:state.auth
});
export default connect(mapStateToProps)(Deactivate);