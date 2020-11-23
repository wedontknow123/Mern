import React, { Component, Fragment } from 'react';
//import screens_test_d from './screens_test_d';
import DownloadLinks from '../createmenu/DownloadLinks';
import Changes_screen from './changes_screen'
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
import {connect} from 'react-redux';
import {getEmpid,getHeaderkey,getOldkey,getdepartment,getapprovalinfo,approval1} from '../../actions/itemActions';
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
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
var nodelink=require('../../nodelink.json');

class Changes_required extends Component{

  uploadObj = new UploaderComponent();
    state={
        type:'Changes Required',
        branch_prv:'',
        branch:"",
        name:'',
        desig:"",
        depart:"",
        empid:"",
        email:'',
        doj:'',
        emptype:'Permanent',
        software:'FS',
        reason:'',
        reasonl:'',
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
        filepath : "",
        department_options:[],
        branch_options:[], 
        errors: {
          name:'',          
          email:'',
          doj:'',                    
        } ,
        boola:true       
    }
    static propTypes={
        auth:PropTypes.object.isRequired
    }

    fileSave=(v,rea)=>{ 

      if(v!==null){//this.state.file          
          const data=new FormData();
          for(var x=0;x<v.length;x++){//v
              data.append('file',v[x].rawFile);
          }
          //console.log(data)
          axios.post(nodelink.site+'/api/doc',data,{}).
          then(res=>{              
              console.log("now gettin new files")
              this.setState({
                  files:res.data
              },()=>{
                      for(var x=0;x<this.state.files.length;x++){
                          const new5={
                              UserAccess_Headerkey:this.props.hkey,
                              Emp_ID:this.state.empid,
                              Document_Name:this.state.files[x],
                              Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss ")
                          }
                          axios.post(nodelink.site+'/api/doc/rec',new5).then(res=>{console.log("now saving new files")})                      
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
    axios.post(nodelink.site+'/api/doc/rec/ch',new6).then(res=>{console.log("now saving old files");})                      
  }}
  if(this.state.filepath.length>=0 && this.state.oldFiles.length>=0){                                 
    this.onSubmit(rea)  
  }
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
    

    handlechange = (values,event) => {        // for combobox till the next @
        if(event!==null){
         var a=event.Emp_ID;
         console.log(a)
      this.setState({
        empid: a,
        boola:false
      }, () => {
        axios.post(nodelink.site+'/api/changes_required/emp',this.state)
        .then(res=>{
            console.log(res.data)
              var r = res.data;
              var x = r[0];
              console.log(r);
              this.setState({
                branch_prv:x.Location,
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
                okey:x.UserAccess_Headerkey,
                status:x.Status
            })
            axios.get(nodelink.site+'/api/download/fp')
            .then(res => {
              var x = res.data
              var y = x[0].Document_Path
              this.setState({
                filepath : y
              })
              //console.log(this.state.filepath)
            })
            axios.post(nodelink.site+'/api/changes_screen/fn',this.state)
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
              })
              console.log(this.state.filenames)
              console.log(this.state.oldFiles)
              console.log(this.state)
            }) 
             
            //this.props.getOldkey(x.UserAccess_Headerkey); 
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
             boola:'true'
          })
      }

  }

    componentDidMount(){      
        axios.get(nodelink.site+'/api/items/department')
        .then(res=>{
            this.setState({
               department_options:res.data
            })
            axios.get(nodelink.site+'/api/items/branch')
        .then(res=>{
        this.setState({
            branch_options:res.data
            })
        console.log("now getting branches")        
        })
            console.log("now gettin depart options")
            console.log(this.state.department_options)        
        })
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
            axios.post(nodelink.site+'/api/changes_required',this.state)
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
     else if(this.props.approver_name!==""){
        //      //console.log("3");

              const info={
                UserAccess_Headerkey:this.props.hkey,
                Emp_ID:this.state.empid,
                Approver_Name:this.props.approver_name,
                Approver_Email:this.props.approver_email
              }
              //console.log(info);
              this.props.approval1(info);
              console.log("done go check in the table")
              setTimeout(() => {
                     this.setState({
                         done:'yes'
                     })
                 }, 3000)
    }
  }
    handlechange1=(e)=>{
      const { name, value } = e.target;        
      //console.log(value);        
      let errors = this.state.errors;
      let reasonl = this.state.reasonl;    
      switch (name) {
          // case 'name': 
          //     errors.name = 
          //     (value.length < 5 && value.length >0)
          //           ? 'Character limit >5 and <10 '
          //         : '';
          //     break;
          // case 'email': 
          //     errors.email = 
          //     validEmailRegex.test(value)
          //         ? ''
          //         : 'Email is not valid';
          //     break;
          // case 'doj': 
          //     errors.doj = 
          //     value < now
          //     ? 'Enter a valid date'
          //     : '';
          //     break;
          case 'reason': 
              reasonl = `${value.length}/150`                
              break;                
          default:
              break;
      }    
      this.setState({errors,reasonl, [name]: value})              
    }

    handlechange8=(e)=>{
      if( e !== null ){
      const { value } = e.target;
      if(Number.isInteger(value) ){
        console.log(value)        
      } 
      else{
        console.log(value);               
        this.setState({branch_prv: value}) 
      } 
    }
    else{
      this.setState({branch_prv: this.state.branch})
    }   
    }

    handlechange7=(value,event)=>{
      if(event!==null ){                                     
       this.setState({
         branch:event.Branch
       }) 
      }   
  }
  
    


    onSubmit=(rea)=>{ 
        var now = new Date();        
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
            Reason:rea,
            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
            Status:'sent for approval',            
            Emp_ID:this.state.empid,
            UserAccess_Headerkey:this.props.hkey,
            User_Email:this.props.auth.user.Email
        }
        axios.post(nodelink.site+'/api/changes_required/save',newItem)
          .then(res=>{
            console.log(res);
            console.log("now saving form")
            const info9={
              UserAccess_Headerkey:this.props.hkey,
              Department:this.state.depart
            }
            console.log(info9);
            this.props.getapprovalinfo(info9);
          //   setTimeout(() => {
          //     this.setState({
          //         done:'yes'
          //     })
          // }, 3000)
          })
    }

    render(){  
      const {errors} = this.state;     
        if(this.state.done=='yes'){
          console.log("ALL DONEE!!!")
          alert("Successfully sent for approval")
          return (
          <Redirect to='/'/>
            )
        }
        const filterOptions1 = createFilterOptions({   //for combo box till the next @
            matchFrom: 'start',
            stringify: (option) => option.Emp_ID,
          });
        const filterOptions2 = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.Branch,
          });
        return(
            <div className="container">
            <Breadcrumb style={{marginTop:'105px'}}>
                <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                 <BreadcrumbItem active>Changes Required Form</BreadcrumbItem>
                 </Breadcrumb>
            <Autocomplete
            id="EmpId"
            options={this.state.items}
            getOptionLabel={(option)=>option.Emp_ID}
            renderOption={(option)=>(
              <React.Fragment>
                {option.Emp_ID} - {option.Emp_Name}
              </React.Fragment>
            )}
            filterOptions={filterOptions1}
            style={{width:300}}
            onChange={this.handlechange}
            renderInput={(params)=><TextField {...params} label="EmpId" variant="outlined"/>}
            />                                        {/* @ */}
           <br></br>
                <Form >
                       <FormGroup row>
                         <Label for="branch" sm={3}>Branch:</Label>
                         <Col sm={5}>
                         <Autocomplete
                           id="Module"
                            options={this.state.branch_options}
                              getOptionLabel={(option)=>option.Branch}
                                 filterOptions={filterOptions2}
                              style={{width:270}}
                              onChange={this.handlechange7}
                              inputValue={this.state.branch_prv}
                              onInputChange={this.handlechange8}
                              renderInput={(params)=><TextField {...params} label="Branch" variant="outlined"/>}
                              disabled={this.state.boola}
                               />
                               </Col>
                         </FormGroup>
                       <FormGroup row>
                          <Label for="name" sm={3}>Employee Name:</Label>
                           <Col sm={5}>
                             <Input type="text" name="name" id="name" maxLength='70' value={this.state.name} disabled={this.state.boola} onChange={this.handlechange1} />
                             {/* {errors.name.length > 0 && <span className='error' style={{color:"red"}}>{errors.name}</span>} */}
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="desig" sm={3}>Designation:</Label>
                           <Col sm={5}>
                             <Input type="text" name="desig" maxLength='70' id="desig" value={this.state.desig} disabled={this.state.boola} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="email" sm={3}>Email:</Label>
                           <Col sm={5}>
                             <Input type="email" name="email" maxLength='150' id="email" value={this.state.email} disabled={this.state.boola} onChange={this.handlechange1}/>
                             {/* {errors.email.length > 0 && <span className='error' style={{color:"red"}}>{errors.email}</span>} */}
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                             <Label for="doj"sm={3}>Date of Joining:</Label>
                             <Col sm={5}>
                                   <Input                                     
                                     type="date"
                                      name="doj"
                                      id="doj"
                                      value={this.state.doj}
                                      onChange={this.handlechange1}
                                      disabled={this.state.boola}
                                    />
                                    {/* {errors.doj.length > 0 && <span className='error' style={{color:"red"}}>{errors.doj}</span>} */}
                                    </Col>
                            </FormGroup>
                            <FormGroup row>
                              <Label for="emptype" sm={3} >Employee Type:</Label>
                              <Col sm={5}>
                                  <Input type ="select" name="emptype" id="emptype" onChange={this.handlechange1} disabled={this.state.boola} value={this.state.emptype}>
                                      <option value="Permanent">Permanent</option>
                                      <option value="Temperory">Temperory</option>
                                      <option value="Apprentice">Apprentice</option>
                                      <option value="Others">others</option>
                                  </Input>
                              </Col>
                            </FormGroup>
                            <FormGroup row>
                            <Label for="software"sm={3}>Software:</Label>
                            <Col sm={5}>
                            <Input type="select" name="software" id="Software" onChange={this.handlechange1} disabled={this.state.boola} value={this.state.software}>
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
                                <DownloadLinks filenames={this.state.filenames}  onClic={this.onClic}  deleteFile={this.deleteFile} />                                
                               </Col>
                            </FormGroup>                            
                            <br/>
                             <hr width="90%" size="15" ></hr>
                             <br/>
                             <FormGroup >
                             <Changes_screen Hkey={this.state.key} //Okey={this.state.okey}
                              Department={this.state.depart} Reason={this.state.reason} Eid={this.state.empid} FSubmit={this.fileSave} Errors={this.state.errors} Fields={this.state}/>                             
                             </FormGroup>
                             <Label style={{color:'red',fontSize:'20px' }} >* Required</Label>
                           
                          </Form>
            </div>
        );
    }
}

const mapStateToProps=state=>({
    item:state.item,
    item:state.item.items,
    hkey:state.item.hkey,
    okey:state.item.okey,
    eid:state.item.eid,
    auth:state.auth,
    department:state.item.department,
    approver_name:state.item.approver_name,
  approver_email:state.item.approver_email
  });
  export default connect(mapStateToProps,{getapprovalinfo,getEmpid,getHeaderkey,getOldkey,getdepartment,approval1})(Changes_required); 