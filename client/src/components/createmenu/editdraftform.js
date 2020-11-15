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
    NavItem,
    Breadcrumb, BreadcrumbItem

} from 'reactstrap';
import {connect} from 'react-redux';
import {getEmpid,getHeaderkey,getdepartment} from '../../actions/itemActions';
import axios from 'axios';
import { Redirect,NavLink } from 'react-router-dom';
import Screens_test_d from './screens_test_d';
import TextField from '@material-ui/core/TextField';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import PropTypes from 'prop-types';
import { UploaderComponent  } from '@syncfusion/ej2-react-inputs';    

var dateFormat = require('dateformat');
var n = 1;
var now = new Date();
var c=0 ;
var lol="no";
const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
var nodelink=require('../../nodelink.json');

class Editdraftform extends Component{
  uploadObj = new UploaderComponent();
    state={
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
        done:'',
        status:'draft',
        items: [],
        useremail:"",
        filenames : [],
        files:[],
        filepath : "",
        r : "",
        department_options:[],
        branch_options:[], 
        errors: {
          name:'',          
          email:'',
          doj:'',                     
        },
        dsb:'' ,
        boola:true       
    }  

    static propTypes={
      auth:PropTypes.object.isRequired
    }

    fileSave = (itr,v,rea) =>{ 
        // let v = this.uploadObj.getFilesData()
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
                          this.onSubmit(itr,rea) 
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
    
    
    handlechange = (values,event) => {        // for combobox till the next @
        if(event!==null){
         console.log(this.props)
         var a=event.Emp_ID;
         console.log(a)
      this.setState({
        empid: a,
        boola:false
      }, () => {
        axios.post(nodelink.site+'/api/draft/emp',this.state)
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
                key:x.UserAccess_Headerkey,
                status:x.Status,
                useremail:x.User_Email
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
             status:'draft'                          
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
        console.log(this.state.branch_options)      
        })
        console.log("now gettin depart options")
        console.log(this.state.department_options)        
    })
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
          axios.post(nodelink.site+'/api/draft',this.state)
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
      const { name, value } = e.target;        
      //console.log(value);        
      let errors = this.state.errors;
      let reasonl=this.state.reasonl;    
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
              reasonl = `${value.length}/150`;                
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
       console.log(event.Branch) 
       console.log(this.state.branch)
      }   
  }

  //   handlechange2=(value,event)=>{
  //     if(event!==null){           
  //      this.setState({
  //        depart:event.Department
  //      }, () => {
  //        console.log(this.state.depart)
  //      });       
  //  }
  // }

    onSubmit=(itr,rea)=>{
      this.props.getdepartment(this.state.depart);
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
            Reason:rea,
            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
            Status:this.state.status,            
            Emp_ID:this.state.empid,
            User_Email:this.props.auth.user.Email
        }       
        axios.post(nodelink.site+'/api/draft/save',newItem)
          .then(res=>{            
            console.log("now saving form")
            if(itr=="yes"){
              lol="yes"
              console.log("changing state")
              var s ={sa:'sent for approval',id:this.state.empid,key:this.state.key}
              axios.post(nodelink.site+'/api/screens_test/upstat',s)
            }          
            setTimeout(() => {
              this.setState({
                  done:'yes'
              })
          },3000)
          })
        }

    render(){ 
        const {errors} = this.state;       
        if(this.state.done=='yes'){
          console.log("ALL DONE!!!")
          if(lol=="yes")
            alert("Successfully sent for approval.")
          else{
            alert("Successfully saved as draft.")
          }
          return  <Redirect to='/'/>            
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
                 <BreadcrumbItem active>Edit User Form</BreadcrumbItem>
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
                    />
                    <br/>
                                                      {/* @ */}
           
                <Form >{/*onSubmit={this.fileSave} disabled={true}*/}
                        
                <FormGroup row>
                         <Label for="branch" sm={3}>Branch:</Label>
                         <Col sm={5}>
                         <Autocomplete
                           id="Module"
                            options={this.state.branch_options }
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
                          <Label for="name" sm={3}>FS Username:</Label>
                           <Col sm={5}>
                             <Input type="text" name="name" maxLength='60' id="name" value={this.state.name} disabled={this.state.boola} onChange={this.handlechange1} />
                             {/* {errors.name.length > 0 && <span className='error' style={{color:"red"}}>{errors.name}</span>} */}
                              </Col>
                         </FormGroup>
                         <FormGroup row>
                          <Label for="desig" sm={3}>Designation:</Label>
                           <Col sm={5}>
                             <Input type="text" name="desig" maxLength='60' id="desig" value={this.state.desig} disabled={this.state.boola} onChange={this.handlechange1}/>
                              </Col>
                         </FormGroup>
                         
                         <FormGroup row>
                          <Label for="email" sm={3}>Email:</Label>
                           <Col sm={5}>
                             <Input type="email" name="email" maxLength='150' id="email" value={this.state.email} disabled={this.state.boola} onChange={this.handlechange1}/>
                             {/* {errors.email.length > 0 && <span className='error' style={{color:"red"}}>{errors.email}</span>}  */}
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
                                <DownloadLinks filenames={this.state.filenames}  onClic={this.onClic} deleteFile={this.deleteFile} />                                
                               </Col>
                            </FormGroup>                            
                             <br/>
                             <hr width="90%" size="15" ></hr>
                             <br/>
                             <FormGroup >
                             <Screens_test_d Hkey={this.state.key} Department={this.state.depart} Eid={this.state.empid} FSubmit={this.fileSave} Errors={this.state.errors} Fields={this.state}/>                             
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
  eid:state.item.eid,
  auth:state.auth,
  department:state.item.department
  // uemail:state.auth.user
});

  export default connect(mapStateToProps,{getEmpid,getHeaderkey,getdepartment})(Editdraftform);  
