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
import {addItem,getEmpid,getHeaderkey,getdepartment} from '../../actions/itemActions';
import axios from 'axios';
import { Redirect,NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

var dateFormat = require('dateformat');
var now = new Date();
class newuserform extends Component{
    state={
        type:'New User Creation',
        branch:'',
        name:'',
        desig:"",
        depart:"",
        empid:null,
        email:'',
        doj:'',
        emptype:'Permanent',
        software:'FS',
        reason:'',
        key:'',
        done:'',
        file:null,
        filepath:[],
        status:'draft' ,
        department_options:[]
        
    }
    static propTypes={
        auth:PropTypes.object.isRequired
    }
    handlechange1=(e)=>{
        const value=e.target.value;
        this.setState({[e.target.name]:value});
        console.log(value);
        
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
            this.handlechange3();
        })
    }
    handlechange2=(e)=>{

        this.setState({
            file:e.target.files
        })
    }
    componentDidMount(){
        axios.get('/api/items/department')
        .then(res=>{
            this.setState({
               department_options:res.data
            })
            console.log(this.state.department_options)
        })
    }
    handlechange4=(e)=>{
        e.preventDefault();
        if(this.state.file!==null){
        const data=new FormData();
       for(var x=0;x<this.state.file.length;x++){
           data.append('file',this.state.file[x]);
       }
       axios.post('/api/doc',data,{}).
       then(res=>{
       this.setState({
           filepath:res.data
       },()=>{

           for(var x=0;x<this.state.filepath.length;x++){
           const new5={
               UserAccess_Headerkey:this.state.key,
               Emp_ID:this.state.empid,
               Document_Name:this.state.filepath[x],
               Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss ")
           }
           axios.post('/api/doc/rec',new5)
           .then(res=>{
              if(this.state.empid!==null){
                this.getheader()
            }
           })
       }
       })
       })
    }
    else{
        if(this.state.empid!==null){
            this.getheader()
        }
    }
    }
   
    handlechange3=(event)=>{
        
        console.log(this.state)
        console.log(this.props.auth.user.Email)
        console.log(this.props)
        if(this.state.empid){
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
            Status:this.state.status,
            User_Email:this.props.auth.user.Email
        }
        console.log(newItem)
        this.props.addItem(newItem);
        this.props.getEmpid(this.state.empid);
        this.props.getHeaderkey(this.state.key);
        this.props.getdepartment(this.state.depart);
        console.log(this.props)
        console.log(newItem.Trans_Datetime);
        this.setState({
            done:'yes'
        })
        }
   
    }
    handlechange6=(value,event)=>{
        if(event!==null){ 
            
         this.setState({
           depart:event.Department
         }, () => {
           console.log(this.state.depart)
           //this.getheader();
         });
         
     }

    }
    render(){
        if(this.state.empid&&this.state.done=='yes'){
            //return <Redirect to='/options/newuser/screens'/>
            return <Redirect to='/options/newuser/screens_test'/>
        }
        const filterOptions1 = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.Department,
          });
        return(
            <div className="container">
                <Form onSubmit={this.handlechange4}>
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
                         {/* <FormGroup row>
                          <Label for="depart" sm={3}>Department:</Label>
                           <Col sm={5}>
                             <Input type="text" name="depart" id="depart" onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>   */}
                         <FormGroup row>
                         <Label for="depart" sm={3}>Department:</Label>
                         <Col sm={5}>
                         <Autocomplete
                           id="Module"
                            options={this.state.department_options}
                              getOptionLabel={(option)=>option.Department}
                                 filterOptions={filterOptions1}
                              style={{width:300}}
                              onChange={this.handlechange6}
                              renderInput={(params)=><TextField {...params} label="Department" variant="outlined"/>}
                               />
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
                               <CustomInput type="file" id="exampleCustomFileBrowser" name="customFile" label="Select the required files" multiple onChange={this.handlechange2}/>
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
    item:state.item,
    auth:state.auth,
    item:state.item.items,
    hkey:state.item.hkey,
    eid:state.item.eid,
    department:state.item.department
  });
export default connect(mapStateToProps,{addItem,getEmpid,getHeaderkey,getdepartment})(newuserform);