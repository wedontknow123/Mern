import React,{Component} from 'react';
import {connect} from 'react-redux';
import { Redirect,NavLink } from 'react-router-dom';
import axios from 'axios';
import {Button,Alert,Label,Form,FormGroup,Input,Col } from 'reactstrap';
import PropTypes from 'prop-types';
import DownloadLinks from './DownloadLinks'
import Screens_test_d from './screens_test_d';
import { UploaderComponent  } from '@syncfusion/ej2-react-inputs';

var dateFormat = require('dateformat');
var n = 1;
var now = new Date();
var c=0 ;
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
var nodelink=require('../../nodelink.json');

class Displaying_rejected extends Component{
    uploadObj = new UploaderComponent();
    state={
        info:[],
        last:0,
        useremail:"",
        r:"",
        dep:0,
        remark:'',
        userid:'',
        created_on:'',
        branch:'',
        name:'',
        empid:this.props.eid,
        key: this.props.hkey,        
        desig:"",
        depart:"",
        email:'',
        doj:'',
        emptype:'Permanent',
        software:'FS',
        reason:this.props.reason,
        status:'draft',
        items: [],
        data:[],
        filenames : [],        
        filepath : "",
        done:"",
        errors: {
            name:'',          
            email:'',
            doj:'',                     
          },
        dsb:"no"       
    }

    handlechange1=(e)=>{
        const { name, value } = e.target;        
        //console.log(value);        
        let errors = this.state.errors;    
        // switch (name) {
        //     case 'name': 
        //         errors.name = 
        //         (value.length < 5 && value.length >0)
        //               ? 'Character limit >5 and <10 '
        //             : '';
        //         break;
        //     case 'email': 
        //         errors.email = 
        //         validEmailRegex.test(value)
        //             ? ''
        //             : 'Email is not valid';
        //         break;
        //     case 'doj': 
        //         errors.doj = 
        //         value < now
        //         ? 'Enter a valid date'
        //         : '';
        //         break;                
        //     default:
        //         break;
        // }    
        this.setState({errors,[name]: value})
          
      }

    componentDidMount(){       
        console.log(this.props)
        var a=String(this.props.key)
        const info={
            Emp_ID:this.props.eid,
            UserAccess_Headerkey:String(this.props.hkey)
        }        
        axios.post(nodelink.site+'/api/apmaster/display',info)
          .then(res=>{
          this.setState({
              info:res.data
          })
          axios.post(nodelink.site+'/api/apmaster/emp',this.props)
                .then(res=>{            
                    console.log(res.data)
                    console.log(this.state.info)
                    var r = res.data;
                    var x = r[0];
                    console.log(r);
                    this.setState({
                        branch:x.Location,
                        name:x.Emp_Name,
                        desig:x.Emp_Designation,
                        depart:x.Emp_Department,
                        email:x.Emp_Email,
                        doj:dateFormat(x.DOJ, "yyyy-mm-dd"),
                        emptype:x.Employee_Type,
                        software:x.Software,
                    })  
                    axios.post(nodelink.site+'/api/download/fn',this.state)
                    .then(res => {              
                    this.setState({
                        filenames : res.data
                    })
                    console.log(this.state.filenames)
                    }) 
                    axios.get(nodelink.site+'/api/download/fp')
                    .then(res => {
                    var x = res.data
                    var y = x[0].Document_Path
                    this.setState({
                        filepath : y
                    })
                    console.log(this.state.filepath)
                     })
                    // axios.post('/api/screens_test_d/data',this.state)
                    // .then(res=>{
                    //   var datas =[];
                    //   var i;
                    //   for (i=1;i<res.data.length+1;i++){
                    //       var x ={ mo: res.data[i-1].Module , sc: res.data[i-1].Screens };
                    //       datas[i-1] = x
                    //   }                       
                    //   this.setState({
                    //     data : datas           
                    //    })                  
                    //     console.log("now getting data for table")
                    // })                 
                    console.log(this.props)
                    console.log(this.state)            
        })                     
          })
  
}
    static propTypes={
        auth:PropTypes.object.isRequired
    }

    fileSave = () =>{ 
        let v = this.uploadObj.getFilesData()
        var x;
        if(v!==null){           
            const data=new FormData();
            for(var y=0;y<v.length;y++){//v
                data.append('file',v[y].rawFile);
            }
            axios.post(nodelink.site+'/api/doc',data,{}).
            then(res=>{                
              console.log("now gettin new files")
                this.setState({
                    files:res.data
                },()=>{
                        for(x=0;x<this.state.files.length;x++){
                        const new5={
                            UserAccess_Headerkey:this.state.key,
                            Emp_ID:this.state.empid,
                            Document_Name:this.state.files[x],
                            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss ")
                        }
                        axios.post(nodelink.site+'/api/doc/rec',new5)
                        .then(res=>{                          
                          console.log("now saving new files"); 
                           c=c+1;                                                      
                           console.log(c)                   
                         })                     
                        } 
                        console.log("lol")
                        if(this.state.filepath.length>=0){                                 
                          this.handleclick1() 
                        }                             
                    })
            })
     }     
    }

    deleteFile = (ikey,name) =>{
        var fileName = this.state.filenames[ikey].Document_Name
        console.log(fileName) 
        console.log(this.state.key)      
        var a = {fname : fileName, fpath:this.state.filepath, hkey:this.state.key}
        axios.post(nodelink.site+'/api/download/del', a ).then(res=>{console.log(res)})       
        console.log(ikey)
          document.getElementById(ikey).innerHTML = "DELETED!";
          document.getElementById(name).remove() 
          console.log(this.state.filenames)              
      }
  
      onClic = (key) =>{      //download file
        console.log(key)
        var fileName = this.state.filenames[key].Document_Name
        console.log(fileName)      
        var a = {fname : fileName, fpath:this.state.filepath}
         axios.post(nodelink.site+'/api/download',a,{responseType: 'arraybuffer'})//{responseType: 'blob'}
              .then(function(res){             
                var data = new Blob([res.data]);              
                var blob = data;
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.setAttribute('download',fileName);                 
                document.body.appendChild(link);                          
                link.click()             
             })
             .catch((error) => {
              console.log(error);
            });
      }

    handleclick1=()=>{
        const info={
            UserAccess_Headerkey:String(this.props.hkey),
            Department:this.state.info[0].Emp_Department
        }
        var now = new Date();
        const newItem={
            Location:this.state.branch,
            Emp_Name:this.state.name,
            Emp_Designation:this.state.desig,
            Emp_Department:this.state.depart,
            Emp_Email:this.state.email,
            DOJ:this.state.doj,
            Employee_Type:this.state.emptype,
            Software:this.state.software,
            Reason:this.state.reason,
            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
            Status:this.state.status,            
            Emp_ID:this.state.empid,
            User_Email:this.props.auth.user.Email
        }       
        axios.post(nodelink.site+'/api/draft/save',newItem)
          .then(res=>{            
            console.log("now saving form")
            axios.post(nodelink.site+'/api/apmaster',info)
            .then(res=>{
                console.log(res)
                const info1={
                    UserAccess_Headerkey:this.props.hkey,
                    Emp_ID:this.props.eid,
                    Approver_Name:res.data[0].Approver_Name,
                    Approver_Email:res.data[0].Email
                }
                console.log(info1);
                axios.post(nodelink.site+'/api/apmaster/submit',info1)
                .then(res=>{
                    console.log(res); 
                    axios.post(nodelink.site+'/api/apmaster/rejectedstatus',info1)
                    .then(res=>{
                        console.log(res);
                        setTimeout(() => {
                            this.setState({
                                done:'yes'
                            })
                        },3000)
                    })                             
                    
                })                
            })
          })
    }
    render(){
        if(this.state.done=='yes'){
            console.log("ALL DONEE!!!")
              return (
              <Redirect to='/'/>
               )
            }
        if(this.props.hkey==""){
            console.log("no key")
                return (
                <Redirect to='/rejected'/>
                )
            }
        const {errors} = this.state;
        return(
            <div className="container">
                                   
                    <Form  >
                            <h3 >{this.props.eid} :</h3>
                            <br/>
                            <FormGroup row>
                               <Label for="exampleText"sm={3}>Reason :</Label>
                               <Col sm={5}>
                               <Input type="textarea" name="reason" id="reason"  maxLength='150' value={this.state.reason} disabled/>                               
                               </Col>
                            </FormGroup>
                        
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
                             <Input type="text" name="name" maxLength='70' id="name" value={this.state.name} onChange={this.handlechange1} />
                             {/* {errors.name.length > 0 && <span className='error' style={{color:"red"}}>{errors.name}</span>} */}
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="desig" sm={3}>Designation:</Label>
                           <Col sm={5}>
                             <Input type="text" name="desig" maxLength='70' id="desig" value={this.state.desig} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="email" sm={3}>Email:</Label>
                           <Col sm={5}>
                             <Input type="email" name="email" maxLength='150' id="email" value={this.state.email} onChange={this.handlechange1}/>
                             {/* {errors.email.length > 0 && <span className='error' style={{color:"red"}}>{errors.email}</span>}  */}
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                             <Label for="doj"sm={3}>Date of Joining</Label>
                             <Col sm={5}>
                                   <Input                                     
                                     type="date"
                                      name="doj"
                                      id="doj"
                                      value={this.state.doj}
                                      onChange={this.handlechange1}
                                    />
                                    {/* {errors.doj.length > 0 && <span className='error' style={{color:"red"}}>{errors.doj}</span>} */}
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
                               <Label for="uploaded_files"sm={3}>Uploaded Files:</Label>
                               <Col sm={5}>
                                
                                <DownloadLinks filenames={this.state.filenames}  onClic={this.onClic} deleteFile={this.deleteFile} />
                                
                               </Col>
                            </FormGroup>
                            <FormGroup row>
                               <Label for="exampleCustomFileBrowser"sm={3}>File Browser</Label>
                               <Col sm={5}>
                                <UploaderComponent type="file" autoUpload={false} ref = { upload => {this.uploadObj = upload}} asyncSettings={this.path} />
                               </Col>
                             </FormGroup>                            
                             <br/>
                             <hr width="90%" size="15" ></hr>
                             <br/>
                             <FormGroup >
                             <Screens_test_d Hkey={this.state.key} Department={this.state.depart} Eid={this.state.empid} FSubmit={this.fileSave} Errors={this.state.errors} Fields={this.state} />                             
                             </FormGroup>
                             <Label style={{color:'red',fontSize:'20px' }} >* Required</Label>
                          </Form>
             
            </div>
        )
    }
}

const mapStateToProps=state=>({
    hkey:state.item.hkey,
    auth:state.auth,
    eid:state.item.eid,
    reason:state.item.reason
  });

export default connect(mapStateToProps)(Displaying_rejected);