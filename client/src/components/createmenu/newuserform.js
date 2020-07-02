import React, { Component, Fragment } from 'react';
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    Col,
    CustomInput,
    NavItem
} from 'reactstrap';
import {connect} from 'react-redux';
import {addItem} from '../../actions/itemActions';
import axios from 'axios';
import { Redirect,NavLink } from 'react-router-dom';
import e from 'express';
var dateFormat = require('dateformat');
class newuserform extends Component{
    state={
        type:'New User Creation',
        branch:'',
        name:'',
        desig:"",
        depart:"",
        empid:"",
        email:'',
        doj:'',
        emptype:'Permanent',
        software:'FS',
        reason:'',
        key:'',
        done:'',
        file:'',
        filename:'',
        status:'draft'     
    }
   
    handlechange1=(e)=>{
        const value=e.target.value;
        this.setState({[e.target.name]:value});
        console.log(value);
        if(e.target.name==='empid'){
            this.getheader()
        }
    }
    handlechange=(e)=>{
        console.log(e.target.files);
        this.setState({
            file:e.target.files[0],
            filename:e.target.files[0].name
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
                    key:v
                })
            }
        })
    }
    
    handlechange3=(event)=>{
        e.preventDefault();
        if(this.state.empid){
        event.preventDefault();
        var now = new Date();
        const newItem={
            Trans_Type:this.state.type,
            Location:this.state.branch,
            Emp_Name:this.state.name,
            Emp_Designation:this.state.desig,
            Emp_Department:this.state.depart,
            Emp_ID:this.state.empid,
            Emp_Email:this.state.email,
            DOJ:this.state.doj,
            Employee_Type:this.state.emptype,
            Software:this.state.software,
            Reason:this.state.reason,
            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
            UserAccess_Headerkey:this.state.key,
            Status:this.state.status
        }
        
        this.props.addItem(newItem);
        console.log(newItem.Trans_Datetime);
        this.setState({
            done:'yes'
        })
        }
    }
    
    render(){
        if(this.state.empid&&this.state.done=='yes'){
            //return <Redirect to='/options/newuser/screens'/>
            return <Redirect to='/options/newuser/screens_test'/>
        }
        return(
            <div className="container">
                <Form onSubmit={this.handlechange3}>
                        <FormGroup tag="fieldset" row>
                            <legend className="col-form-label col-sm-3">Branch</legend>
                            <Col sm={10}>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="branch" value="Marketing" checked={this.state.branch==='Marketing'} onChange={this.handlechange1}/>
                                    Marketing
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="branch" value="SCM" checked={this.state.branch==='SCM'} onChange={this.handlechange1}/>
                                    SCM
                                    </Label>
                                    </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="branch" value="MFG-Hosur Rd Plant" checked={this.state.branch==='MFG-Hosur Rd Plant'} onChange={this.handlechange1}/>
                                     MFG-Hosur Rd Plant
                                    </Label>
                                </FormGroup>
                                <FormGroup check inline>
                                    <Label check>
                                    <Input type="radio" name="branch" value="MFG-jigani Rd plant" checked={this.state.branch==='MFG-jigani Rd plant'} onChange={this.handlechange1}/>
                                     MFG-Jigani Rd Plant
                                    </Label>
                                </FormGroup>
                                    </Col>
                                </FormGroup>
                       <FormGroup row>
                          <Label for="name" sm={3}>FS Username:</Label>
                           <Col sm={5}>
                             <Input type="text" name="name" id="name" onChange={this.handlechange1} />
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="desig" sm={3}>Designation:</Label>
                           <Col sm={5}>
                             <Input type="text" name="desig" id="desig" onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>  
                         <FormGroup row>
                          <Label for="depart" sm={3}>Department:</Label>
                           <Col sm={5}>
                             <Input type="text" name="depart" id="depart" onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>  
                         <FormGroup row>
                          <Label for="emp_id" sm={3}>Employee Id:</Label>
                           <Col sm={5}>
                             <Input type="text" name="empid" id="empid" onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup> 
                         <FormGroup row>
                          <Label for="email" sm={3}>Email:</Label>
                           <Col sm={5}>
                             <Input type="email" name="email" id="email" onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup> 
                         <FormGroup row>
                             <Label for="doj"sm={3}>Date of Joining</Label>
                             <Col sm={5}>
                                   <Input
                                     type="date"
                                      name="doj"
                                      id="doj"
                                      onChange={this.handlechange1}
                                    />
                                    </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="emptype" sm={3} >Employee Type</Label>
                              <Col sm={5}>
                                  <Input type ="select" name="emptype" id="emptype" onChange={this.handlechange1} value={this.state.emptype}>
                                      <option value="Permanent">Permanent</option>
                                      <option value="Temperory">Temperory</option>
                                      <option value="Apprentice">Apprentice</option>
                                      <option value="Others">others</option>
                                  </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label for="software"sm={3}>Software</Label>
                            <Col sm={5}>
                            <Input type="select" name="software" id="Software" onChange={this.handlechange1} value={this.state.software}>                              
                               <option value='FS'>FS</option>
                               <option value='SS'>SS</option>
                               <option value='Focus'>Focus</option>
                                <option value='Invoicing'>Invoicing</option>
                                <option value="others">Others</option>
                             </Input>
                             </Col>
                            </FormGroup>
                            <FormGroup row>
                               <Label for="exampleText"sm={3}>Reason</Label>
                               <Col sm={5}>
                               <Input type="textarea" name="reason" id="reason" onChange={this.handlechange1}/>
                               </Col>
                            </FormGroup>
                            <FormGroup row>
                               <Label for="exampleCustomFileBrowser"sm={3}>File Browser</Label>
                               <Col sm={5}>
                               <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Yo, pick a file!" onChange= {this.handlechange} multiple/>
                               </Col>
                             </FormGroup>
                            <FormGroup check row>
                                <Col sm={{ size: 10, offset: 3 }}>
                                 <Button >Save and Next</Button>
                                </Col>
                                {/* <Col sm={{ size: 10, offset: 3 }}>
                                 <Button >Save as Draft</Button>
                                </Col> */}
                            </FormGroup>


                </Form>            
            </div>
        );
    }
}
const mapStateToProps=state=>({
    item:state.item
  });
  export default connect(mapStateToProps,{addItem})(newuserform);