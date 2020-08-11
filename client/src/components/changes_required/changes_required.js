import React, { Component, Fragment } from 'react';
//import screens_test_d from './screens_test_d';
import DownloadLinks from '../createmenu/DownloadLinks'
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    Col,
    NavItem
} from 'reactstrap';
import {connect} from 'react-redux';
import {getEmpid,getHeaderkey,getOldkey} from '../../actions/itemActions';
import axios from 'axios';
import { Redirect,NavLink } from 'react-router-dom';
//import screens from './screens';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import { UploaderComponent  } from '@syncfusion/ej2-react-inputs'; 
import PropTypes from 'prop-types';

var dateFormat = require('dateformat');
var n = 1
var now = new Date();

class changes_required extends Component{

  uploadObj = new UploaderComponent();
    state={
        type:'Changes Required',
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
        okey:'',
        done:'',
        status:'',
        items: [],
        useremail:"",
        r : "",
        filenames : [],
        oldFiles : [],
        files:[],
        filepath : ""
    }
    static propTypes={
        auth:PropTypes.object.isRequired
    }

    fileSave=(e)=>{
      e.preventDefault();
                 
     console.log(this.uploadObj.getFilesData())
      let v = this.uploadObj.getFilesData()
      if(v!==null){//this.state.file
          
          const data=new FormData();
          for(var x=0;x<v.length;x++){//v
              data.append('file',v[x].rawFile);
          }
          console.log(data)
          axios.post('/api/doc',data,{}).
          then(res=>{              
              console.log(res.data)
              this.setState({
                  files:res.data
              },()=>{
                  console.log(this.state.filepath)
                  console.log(this.state.key)
                      for(var x=0;x<this.state.files.length;x++){
                          const new5={
                              UserAccess_Headerkey:this.state.key,
                              Emp_ID:this.state.empid,
                              Document_Name:this.state.files[x],
                              Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss ")
                          }
                          axios.post('/api/doc/rec',new5)                      
                        }                         
                  })
          })
   }
   if(this.state.oldFiles!==null){
   for(var x=0;x<this.state.oldFiles.length;x++){
    const new6={
        UserAccess_Headerkey:this.state.key,
        Emp_ID:this.state.empid,
        Document_Name:this.state.oldFiles[x],
        Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss ")
    }
    axios.post('/api/doc/rec/ch',new6)                      
  }}

   this.onSubmit() 
  }

  deleteFile = (ikey,name) =>{ 
    console.log(ikey) 
    console.log(name)    
    var f = (this.state.oldFiles).filter((n) =>{ return  n!==name })
    this.setState({
      oldFiles:f
    })           
    document.getElementById(ikey).innerHTML = "DELETED!";    
    document.getElementById(name).remove() 
    console.log(f)                  
  }

    onClic = (key) =>{      
      console.log(key)
      var fileName = this.state.filenames[key].Document_Name
      console.log(fileName)      
      var a = {fname : fileName, fpath:this.state.filepath}
       axios.post('/api/download',a,{responseType: 'arraybuffer'})//{responseType: 'blob'}
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
    

    handlechange = (values,event) => {        // for combobox till the next @
        if(event!==null){
         var a=event.Emp_ID;
         console.log(a)
      this.setState({
        empid: a
      }, () => {
        axios.post('/api/changes_required/emp',this.state)
        .then(res=>{
            console.log(res.data)
              var r = res.data;
              var x = r[0];
              console.log(r);
              this.setState({
                branch:x.Location,
                name:x.Emp_Name,
                desig:x.Emp_Designation,
                depart:x.Emp_Department,
                empid:x.Emp_ID,
                email:x.Emp_Email,
                doj:dateFormat(x.DOJ, "yyyy-mm-dd"),
                emptype:x.Employee_Type,
                software:x.Software,
                reason:x.Reason,
                key:x.UserAccess_Headerkey,
                okey:x.UserAccess_Headerkey,
                status:x.Status
            })
            axios.post('/api/download/fn',this.state)
            .then(res => {              
              this.setState({
                filenames : res.data,                
              },()=>{
                var f_names = (this.state.filenames).map(f => {                                    
                  return f.Document_Name
                })
                this.setState({
                  oldFiles : f_names
                })
                // var f=[]                
                // for(var i=0;i<this.state.filenames.length;i++){
                //   var n = this.state.filenames[i].Document_Name
                //   f = [...n]
                // }
              })
              console.log(this.state.filenames)
              console.log(this.state.oldFiles)
            }) 
            axios.get('/api/download/fp')
            .then(res => {
              var x = res.data
              var y = x[0].Document_Path
              this.setState({
                filepath : y
              })
              console.log(this.state.filepath)
            }) 
            this.props.getOldkey(x.UserAccess_Headerkey); 
            console.log(this.state)
            this.getheader() 
        })

      });
  }
      if(event==null){
          this.setState({
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
             status:'draft',
             boola:'true'
          })
      }

  }

    componentDidMount(){
        // this.setState({
        //     useremail:this.props.auth.user.Email
        // })
        
        // console.log(this.props)
        // if(this.props.auth.user !== null){
        // axios.get('/api/changes_required')
        // .then(res=>{
        //     this.setState({
        //         items:res.data
        //     })
        //     console.log(this.state.items)
        // })}

        // axios.post('/api/changes_required',this.state)
        // .then(res=>{
        //     this.setState({
        //         items:res.data
        //     })
        //     console.log(this.state.item)
        // })

    }        // @

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
            axios.post('/api/changes_required',this.state)
              .then(res=>{
              this.setState({
                  items:res.data,
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

    handlechange1=(e)=>{
        const value=e.target.value;
        this.setState({[e.target.name]:value});
        console.log(value); 
               
    }
    see=()=>{
        console.log("yesss");
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
            console.log(this.state.key)
        })
    }


    onSubmit=()=>{              
        
        var now = new Date();
        console.log(this.state.key)
        const newItem={
            Trans_Type:this.state.type,
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
            Status:'sent for approval',            
            Emp_ID:this.state.empid,
            UserAccess_Headerkey:this.state.key,
            User_Email:this.props.auth.user.Email
        }
        this.props.getEmpid(this.state.empid);
        this.props.getHeaderkey(this.state.key);
        console.log(this.props)
        console.log(this.state.oldFiles)
        axios.post('/api/changes_required/save',newItem)
          .then(res=>{
            console.log(res);
            this.setState({
                done:'yes',
                // draft:'false'
              })
          })
    }

    render(){
        this.see();
        if(this.state.done=='yes'){
            return (
            <Redirect to='/changes_required/changes_screen'/>
            // <div><screens_test_d empid = {this.state.empid}/></div>
             )
        }
        const filterOptions1 = createFilterOptions({   //for combo box till the next @
            matchFrom: 'start',
            stringify: (option) => option.Emp_ID,
          });
          console.log(this.props)
        return(
            <div className="container">
            <Autocomplete
            id="EmpId"
            options={this.state.items}
            getOptionLabel={(option)=>option.Emp_ID}
            filterOptions={filterOptions1}
            style={{width:300}}
            onChange={this.handlechange}
            renderInput={(params)=><TextField {...params} label="EmpId" variant="outlined"/>}
            />                                        {/* @ */}
           
                <Form onSubmit={this.fileSave} disabled={true}>
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
                             <Input type="text" name="name" id="name" value={this.state.name} onChange={this.handlechange1} />
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="desig" sm={3}>Designation:</Label>
                           <Col sm={5}>
                             <Input type="text" name="desig" id="desig" value={this.state.desig} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="depart" sm={3}>Department:</Label>
                           <Col sm={5}>
                             <Input type="text" name="depart" id="depart" value={this.state.depart} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="email" sm={3}>Email:</Label>
                           <Col sm={5}>
                             <Input type="email" name="email" id="email" value={this.state.email} onChange={this.handlechange1}/>
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
                            <FormGroup row>
                               <Label for="exampleText"sm={3}>Reason</Label>
                               <Col sm={5}>
                               <Input type="textarea" name="reason" id="reason" value={this.state.reason} onChange={this.handlechange1}/>
                               </Col>
                            </FormGroup>
                            <FormGroup check row>
                               <Col sm={{ size: 10, offset: 3 }}>
                                 <Button >Save and Next</Button>
                                   </Col>
                                 </FormGroup>
                          </Form>
            </div>
        );
    }
}

const mapStateToProps=state=>({
    item:state.item.items,
    hkey:state.item.hkey,
    okey:state.item.okey,
    eid:state.item.eid,
    auth:state.auth
  });
  export default connect(mapStateToProps,{getEmpid,getHeaderkey,getOldkey})(changes_required); 