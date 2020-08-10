import React, { Component, Fragment } from 'react';
//import screens_test_d from './screens_test_d';
import DownloadLinks from './DownloadLinks'
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
import {getEmpid,getHeaderkey} from '../../actions/itemActions';
import axios from 'axios';
import { Redirect,NavLink } from 'react-router-dom';
//import screens from './screens';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { UploaderComponent  } from '@syncfusion/ej2-react-inputs';    

var dateFormat = require('dateformat');
var n = 1
var now = new Date();

class editdraftform extends Component{
  uploadObj = new UploaderComponent();
    state={
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
        items: [],
        useremail:"",
        filenames : [],
        files:[],
        filepath : "",
        r : "",
        
        
    }  

    static propTypes={
      auth:PropTypes.object.isRequired
    }

    fileSave = (e) =>{
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
                            this.onSubmit()
                            
                    })
            })
     }
   
    }

    deleteFile = (ikey,name,bid) =>{
      var fileName = this.state.filenames[ikey].Document_Name
      console.log(fileName) 
      console.log(this.state.key)      
      var a = {fname : fileName, fpath:this.state.filepath, hkey:this.state.key}
      axios.post('/api/download/del', a )
      // .then(res=>{
        
      // }) 
      console.log(ikey)
        //console.log(res)
        document.getElementById(ikey).innerHTML = "DELETED!";
        //document.getElementById(name).remove()
        document.getElementById(bid).remove() 
        console.log(this.state.filenames)              
    }

    onClic = (key) =>{      //download file
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
         console.log(this.props)
         var a=event.Emp_ID;
         console.log(a)
      this.setState({
        empid: a
      }, () => {
        axios.post('/api/draft/emp',this.state)
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
                status:x.Status,
                useremail:x.User_Email
            })  
            axios.post('/api/download/fn',this.state)
            .then(res => {              
              this.setState({
                filenames : res.data
              })
              console.log(this.state.filenames)
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
            console.log(this.props)
            console.log(this.state)            
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
             boola:'true',
             //c : 'true'
          })
      }
  }

    componentDidUpdate(){
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
          axios.post('/api/draft',this.state)
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

    onSubmit=()=>{
        
        // event.preventDefault();
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
        this.props.getEmpid(this.state.empid);
        this.props.getHeaderkey(this.state.key);
        console.log(this.props)
        
        axios.post('/api/draft/save',newItem)
          .then(res=>{
            console.log(res);
            this.setState({
                done:'yes',
                // draft:'false'
              })
          })



    }

    render(){
        //if(this.state.c == 'true'){
          // console.log(this.props)
          // axios.get('/api/draft')
          //   .then(res=>{
          //   this.setState({
          //       items:res.data,
          //       //c:'false'
          //   })
          //   console.log(this.state.items)
          //   }) 

        //}
        
        
        if(this.state.done=='yes'){
            return (
            <Redirect to='/options/editdraftform/screens_test_d'/>
            // <div><screens_test_d empid = {this.state.empid}/></div>
             )
        }
        const filterOptions1 = createFilterOptions({   //for combo box till the next @
            matchFrom: 'start',
            stringify: (option) => option.Emp_ID,
          });
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
                    />
                                                      {/* @ */}
           
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
  eid:state.item.eid,
  auth:state.auth,
  // uemail:state.auth.user
});

  export default connect(mapStateToProps,{getEmpid,getHeaderkey})(editdraftform);  
//export default (editdraftform);