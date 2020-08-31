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
import {getEmpid,getHeaderkey,getdepartment} from '../../actions/itemActions';//addItem,
import axios from 'axios';
import { Redirect,NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { UploaderComponent  } from '@syncfusion/ej2-react-inputs';
import Screens_test from './screens_test';

var dateFormat = require('dateformat');
var now = new Date();
// var lol =0;
// var rd =0;
var c=0 
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

class newuserform extends Component{

    uploadObj = new UploaderComponent();     
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
        reasonl:'',
        key:'',
        done:'',
        file:null,
        filepath:[],
        status:'draft' ,
        department_options:[],
        errors: {
            name:'',
            empid:'',
            email:'',
            doj:'',                      
          }
               
    }
    static propTypes={
        auth:PropTypes.object.isRequired
    }
    handlechange1=(e)=>{
        const { name, value } = e.target;        
        //console.log(value);        
        let errors = this.state.errors; 
        let reasonl = this.state.reasonl;   
        switch (name) {
            case 'name': 
                errors.name = 
                (value.length < 5 && value.length >0)
                    ? 'Character limit >5 and <10 '
                    : '';
                break;
            case 'email': 
                errors.email = 
                (validEmailRegex.test(value))
                    ? ''
                    : 'Email is not valid';
                break;            
            case 'empid': 
                errors.empid = 
                (value.length < 10 && value.length >0) 
                ? 'Employee ID must be less than or equal to 10 characters'
                : '';
                break;
            case 'doj': 
                errors.doj = 
                value < now
                ? 'Enter a valid date'
                : '';
                break;
            case 'reason': 
                reasonl = `${value.length}/150`                
                break;                
            default:
                break;
        }    
        this.setState({errors,reasonl, [name]: value})
    }

    handlechange6=(value,event)=>{
        if(event!==null){                                     
         this.setState({
           depart:event.Department
         }) 
        }   
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
                console.log("now getting header key")
                this.setState({
                    key:v
                })
            }
        })
    }
   
    componentDidMount(){
        axios.get('/api/items/department')
        .then(res=>{
            this.setState({
               department_options:res.data
            })
            console.log("now getting departments")
            this.getheader()
            //console.log(this.state.key)
        })
    }
       
    handlechange4=(itr)=>{         
        let v = this.uploadObj.getFilesData()
        var x;
        if(v!==null){
            const data=new FormData();
            for(var y=0;y<v.length;y++){//v
                data.append('file',v[y].rawFile);
            }            
            axios.post('/api/doc',data,{}).
            then(res=>{                
                console.log("now gettin new files")                
                this.setState({
                    filepath:res.data,                    
                },()=>{                  
                        for(x=0;x<this.state.filepath.length;x++){
                        const new5={
                            UserAccess_Headerkey:this.state.key,
                            Emp_ID:this.state.empid,
                            Document_Name:this.state.filepath[x],
                            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss ")
                        }
                        axios.post('/api/doc/rec',new5)
                        .then(res=>{                            
                            console.log("now saving new files"); 
                             c=c+1;
                             console.log(c)
                            //  if(c==this.state.filepath.length){                                 
                            //     this.handlechange3(itr) 
                            // }                      
                           })                                                
                        }
                        if(this.state.filepath.length>=0){                                 
                            this.handlechange3(itr) 
                        }                                                                   
                    })
            })
     }     
    }
   
    handlechange3=(itr)=>{          
        this.props.getdepartment(this.state.depart);
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
        axios.post('/api/items',newItem)
       .then(res=>{
            console.log("now saving newuserform")
            if(itr=="yes"){
                console.log("changing state")
            var s ={sa:'sent for approval',id:this.state.empid,key:this.state.key}
            axios.post('/api/screens_test/upstat',s)
            }
            setTimeout(() => {
                this.setState({
                    done:'yes'
                })
            }, 3000)
            
       })        
        }   
    }


    render(){
        const {errors} = this.state;
        if(this.state.done=='yes'){            
            console.log("ALL DONE !!")
            return <Redirect to='/options'/>     //the final return should be inside an else ....         
        }
        const filterOptions1 = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.Department,
          });
        return( //
            <div className="container">
                <Form  > {/*onSubmit={this.handlechange4} // should have a onsubmit attribute to disable bothe buttons */} 
                        
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
                             <Input type="text" name="name" id="name" maxLength='100' onChange={this.handlechange1} />
                             {errors.name.length > 0 && <span className='error' style={{color:"red"}}>{errors.name}</span>}
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="desig" sm={3}>Designation:</Label>
                           <Col sm={5}>
                             <Input type="text" name="desig" id="desig" maxLength='100' onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>  
                         {/* <FormGroup row>
                          <Label for="depart" sm={3}>Department:</Label>
                           <Col sm={5}>
                             <Input type="text" name="depart" id="depart" onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>   */}
                         <FormGroup row>
                         <Label for="depart" sm={3}>Department <span className="required" style={{color:'red',fontSize:'20px'}}>*</span>:</Label>
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
                          <Label for="emp_id" sm={3}>Employee Id <span className="required" style={{color:'red',fontSize:'20px'}}>*</span>:</Label>
                           <Col sm={5}>
                             <Input type="text" name="empid" id="empid" maxLength='10' onChange={this.handlechange1}/>
                             {errors.empid.length > 0 && <span className='error' style={{color:"red"}}>{errors.empid}</span>}
                              </Col>
                         </FormGroup> 
                         <FormGroup row>
                          <Label for="email" sm={3}>Email:</Label>
                           <Col sm={5}>
                             <Input type="email" name="email" id="email" maxLength='150' onChange={this.handlechange1}/>
                             {errors.email.length > 0 && <span className='error' style={{color:"red"}}>{errors.email}</span>}   
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
                                    {errors.doj.length > 0 && <span className='error' style={{color:"red"}}>{errors.doj}</span>}
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
                               <Label for="exampleCustomFileBrowser"sm={3}>File Browser</Label>
                               <Col sm={5}>
                               <UploaderComponent type="file" autoUpload={false} ref = { upload => {this.uploadObj = upload}} asyncSettings={this.path} />                               
                               </Col>
                             </FormGroup>
                            <FormGroup row>
                               <Label for="exampleText"sm={3}>Reason</Label>
                               <Col sm={5}>
                               <Input type="textarea" name="reason" id="reason" maxLength='150' onChange={this.handlechange1}/>
                               {this.state.reason.length > 0 && <span className='error' style={{color:"red"}}>{this.state.reasonl}</span>}
                               </Col>
                            </FormGroup>                            
                             <br/>
                             <hr width="90%" size="15" ></hr>
                             <br/>
                             <FormGroup >
                             <Screens_test Hkey={this.state.key} Department={this.state.depart} Eid={this.state.empid} FSubmit={this.handlechange4} Errors={this.state.errors} Fields={this.state}/>
                             {/* <Screens_test/>  */}
                             </FormGroup>
                             <Label style={{color:'red',fontSize:'20px' }} >* Required</Label>
                             {/* <Button >Save as Draft</Button> */}

                            {/* <FormGroup check row>
                                <Col sm={{ size: 10, offset: 3 }}>
                                 <Button >Save and Next</Button>
                                </Col>
                                {/* type="submit" onClick={this.handlechange4}
                                <Col sm={{ size: 10, offset: 3 }}>
                                 <Button >Save as Draft</Button>
                                </Col> */}
                            {/* </FormGroup> */}


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
export default connect(mapStateToProps,{getdepartment})(newuserform);//addItem,