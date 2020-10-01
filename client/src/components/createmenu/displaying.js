import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import { Redirect,NavLink } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {approval2} from '../../actions/itemActions';
import { Alert,Label,Form,FormGroup,Input,Col } from 'reactstrap';
import MaterialTable from "material-table";
import {Container,ListGroup,ListGroupItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

var dateFormat = require('dateformat');
var now = new Date();
var n=1;
var nodelink=require('../../nodelink.json')

class Displaying1 extends Component{
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
        reason:'',
        reasonl:'',
        status:'draft',
        items: [],
        data:[],
        filenames : [],        
        filepath : "",
        done:"",
        lol:"",
        approvedby:[]
    }
    static propTypes={
        auth:PropTypes.object.isRequired
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
                        reason:x.Reason
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
                    axios.post(nodelink.site+'/api/screens_test_d/data',this.state)
                    .then(res=>{
                      var datas =[];
                      var i;
                      for (i=1;i<res.data.length+1;i++){
                          var x ={ mo: res.data[i-1].Module , sc: res.data[i-1].Screens };
                          datas[i-1] = x
                      }                       
                      this.setState({
                        data : datas           
                       })                  
                        console.log("now getting data for table")
                        axios.post(nodelink.site+'/api/apmaster/approvedby',info)
                        .then(res=>{
                            this.setState({
                                approvedby:res.data
                            })
                        })
                    })                 
                    console.log(this.props)
                    console.log(this.state)            
        })

                                      
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
            const info5={
                Approver_Email:this.state.useremail
            }
            axios.post(nodelink.site+'/api/apmaster/checkingIT',info5)
              .then(res=>{
              this.setState({
                  r : "yes"
              })
              console.log(res.data)
              if(res.data.length==1){
                  console.log("1");
                  this.setState({
                      dep:1
                  })
                  console.log(this.state.dep)
              }                    
              })
              console.log(this.state)
              n = n+1
          }
        }
      }
    }

    DownloadLinks = () => {
        //filenames.indexOf(fn)*31
         const linkList = this.state.filenames.length ? (
           this.state.filenames.map(fn =>{        
               return(
               <span key={this.state.filenames.indexOf(fn)}>          
                 <a href="#" onClick={() => {this.onClic(this.state.filenames.indexOf(fn))}}  title="Click to Download and Preview">{fn.Document_Name} </a>
                 <br></br>
               </span>        
               )
             })   
         ) : (
           <p>No Uploaded Files</p>
         );
         return linkList
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
        if(window.confirm('Are you sure you want to APPROVE ?')){
            document.getElementById("reject").disabled=true;
            document.getElementById("approve").disabled=true;
            const info={
            Status:'A',
            Reason:this.state.reason,
            UserAccess_Headerkey:String(this.props.hkey),
            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
            Approver_Email:this.props.auth.user.Email,
            Emp_ID:this.props.eid
            }
            console.log(info);
            axios.post(nodelink.site+'/api/apmaster/previous',info)
            .then(res=>{
            console.log(res);
            axios.post(nodelink.site+'/api/apmaster/approval',info)
            .then(res=>{
                const info1={
                    UserAccess_Headerkey:String(this.props.hkey),
                    Department:this.state.info[0].Emp_Department
                }
                axios.post(nodelink.site+'/api/apmaster',info1)
                .then(res=>{
                    console.log(res.data.length)
                    if(res.data.length===1){
                    const info2={
                        UserAccess_Headerkey:this.props.hkey,
                        Emp_ID:this.props.eid,
                        Approver_Name:res.data[0].Approver_Name,
                        Approver_Email:res.data[0].Email
                    }
                    console.log(info2);
                    axios.post(nodelink.site+'/api/apmaster/submit',info2)
                    .then(res=>{
                        console.log(res);
                    })
                    }
                    else{
                        const info3={
                            UserAccess_Headerkey:String(this.props.hkey),
                            Approver_Email: this.props.auth.user.Email
                        }
                        axios.post(nodelink.site+'/api/apmaster/finalApprover',info3)
                        .then(res=>{
                            this.setState({
                                last:1
                            })
                        })
                    }
                    })
                    setTimeout(() => {
                        this.setState({
                            done:'yes',
                            lol:"1"
                        })
                    },3000)
            })
            })
        }
        else{
            document.getElementById("approve").disabled=false;
        }
    }

    handle_rejection=()=>{
        if(this.state.reason.length==0){
            alert("Fill the Reason Field!")
           }
        else{
            if(window.confirm('Are you sure you want to REJECT ?')){
            document.getElementById("reject").disabled=true;
            document.getElementById("approve").disabled=true;
            const info={
                Status:'R',
                Reason:this.state.reason,
                UserAccess_Headerkey:String(this.props.hkey),
                Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
                Approver_Email: this.props.auth.user.Email,
                Emp_ID:this.props.eid
            }
            axios.post(nodelink.site+'/api/apmaster/approval',info)
            .then(res=>{
                console.log(res);
                setTimeout(() => {
                    this.setState({
                        done:'yes',
                        lol:"2"
                    })
                },3000)
            })
            }
            else{
               document.getElementById("reject").disabled=false; 
            }
        }          
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

    handlesubmit=(e)=>{
        e.preventDefault();
        if(this.state.userid.length==0){
            alert("Fill the the User ID field!")
           }
        else{
            if(window.confirm('Are you sure you want to SAVE ?')){
            document.getElementById("itsave").disabled=true;
            const info={
                FS_SS_UserID:this.state.userid,
                Created_on:this.state.created_on,
                Remarks:this.state.remark,
                Emp_ID:this.props.eid,
                UserAccess_Headerkey:this.props.hkey,
                Created_by:this.props.auth.user.Email,
                Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss ")
            }
            console.log(info);
            axios.post(nodelink.site+'/api/apmaster/itcred',info)
            .then(res=>{
                console.log(res);
                setTimeout(() => {
                    this.setState({
                        done:'yes',
                        lol:"3"
                    })
                },3000)
            })
            }
            else{
                document.getElementById("itsave").disabled=false;
            }
        }
    }
    render(){
        if(this.state.done=='yes'){
            console.log("ALL DONEE!!!")
             if(this.state.lol==="1")alert("Approved Successfully !")
             else if(this.state.lol==="2")alert("Rejected Successfully !")
             else alert("Saved Successfully !")
              return (
              <Redirect to='/'/>
               )
            }
            if(this.props.hkey==""){
                console.log("ALL DONEE!!!")
                    return (
                    <Redirect to='/requests'/>
                    )
                }

            const tableIcons = {
                Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
                Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
                Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
                DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
                Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
                Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
                FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
                LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
                NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
                PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
                ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
                Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
                SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
                ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
                ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
              };       

        const defaultProps = {
            bgcolor: 'background.paper',
            m: 1,
            style: { width: '5rem', height: '5rem' },
            borderColor: 'text.primary',
          };
        const list1=(
            <Fragment>
             <Alert color="success">
                UserAccess Form Approved!
             </Alert>
            </Fragment>
            
        );
        console.log(this.props.eid);
        const list4=(
            <Form >
                <FormGroup row>
                    <Label for="name" sm={3}>Branch:</Label>
                    <Col sm={5}>
                        <Input type="text" name="branch" value={this.state.branch} disabled />
                    </Col>                                    
                </FormGroup>
                <FormGroup row>
                    <Label for="name" sm={3}>FS Username:</Label>
                    <Col sm={5}>
                        <Input type="text" name="name" maxLength='100' id="name" value={this.state.name} disabled />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="desig" sm={3}>Designation:</Label>
                    <Col sm={5}>
                        <Input type="text" name="desig" maxLength='100' id="desig" value={this.state.desig} disabled/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="depart" sm={3}>Department:</Label>
                    <Col sm={5}>
                        <Input type="text" name="depart" maxLength='100' id="depart" value={this.state.depart} disabled/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="email" sm={3}>Email:</Label>
                    <Col sm={5}>
                        <Input type="email" name="email" maxLength='150' id="email" value={this.state.email} disabled/> 
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="doj"sm={3}>Date of Joining</Label>
                    <Col sm={5}>
                        <Input type="date" name="doj" id="doj" value={this.state.doj} disabled/>                                    
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="emptype" sm={3} >Employee Type :</Label>
                    <Col sm={5}>
                        <Input type ="text" name="emptype" id="emptype" value={this.state.emptype} disabled/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="software"sm={3}>Software</Label>
                    <Col sm={5}>
                        <Input type="text" name="software" id="Software"  value={this.state.software} disabled/>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="uploaded_files"sm={3}>Uploaded Files:</Label>
                    <Col sm={5}>                                
                        {this.DownloadLinks()}                               
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Label for="exampleText"sm={3}>reason :</Label>
                    <Col sm={5}>
                        <Input type="textarea" name="reason" id="reason"  maxLength='150' value={this.state.reason} disabled/>                        
                    </Col>
                </FormGroup>
                    <br/>
                <MaterialTable
                    title="Modules and Screens"
                    style={{ width : "50%" }}
                    columns={[
                        { title: 'S.No', field:'tableData.id' ,render:rowData =>{return(<p>{rowData.tableData.id+1}</p>)},filtering: false},  //  'tableData.id'
                        { title: 'Module', field: 'mo' },
                        { title: 'Screen', field: 'sc', initialEditValue: 'initial edit value' }
                    ]}
                    icons={tableIcons}
                    data={this.state.data}
                    localization={{
                        header: {
                            actions: ''
                        }}}            
                    options={{
                        filtering: true,
                        actionsColumnIndex: -1,
                        search : false,
                    }}
                />
                <br/>
                </Form> 

        );
        const list2=(            
                <Form> 
                <FormGroup row>
                    <Label for="exampleText"sm={3}>Reason :</Label>
                    <Col sm={5}>
                        <Input type="textarea" name="reason" id="reason"  maxLength='150'  onChange={this.handlechange1}/>
                        {this.state.reason.length > 0 && <span className='error' style={{color:"red"}}>{this.state.reasonl}</span>}
                    </Col>
                </FormGroup>
                    <br/>                             
                <Fragment>                
                    <Button onClick={this.handleclick1} style={{margin:5, backgroundColor:'#393939'}} id="approve">Approve</Button>
                    <Button onClick={this.handle_rejection} style={{backgroundColor:'#393939'}} id="reject">Reject</Button>
                </Fragment>
                </Form>
                  
        );

        const list3=(
            <Fragment>
             <Form onSubmit={this.handlesubmit } >
             <FormGroup row>
                          <Label for="FS_SS User ID" sm={3}>FS_SS User ID</Label>
                           <Col sm={5}>
                             <Input type="text" name="userid" id="uerid" onChange={this.handlechange1}/>
                           </Col>
              </FormGroup> 
              <FormGroup row>
                             <Label for="Created on"sm={3}>Created On</Label>
                             <Col sm={5}>
                                   <Input
                                     type="date"
                                      name="created_on"
                                      id="created_on"
                                      onChange={this.handlechange1}
                                    />
                                    </Col>
                </FormGroup>
                <FormGroup row>
                               <Label for="exampleText"sm={3}>Remarks</Label>
                               <Col sm={5}>
                               <Input type="textarea" name="remark" id="remark" onChange={this.handlechange1}/>
                               </Col>
                </FormGroup>
                <FormGroup>
                <Col sm={{ size: 10, offset: 3 }}>
                     <Button id="itsave" style={{backgroundColor:'#393939'}}>Save</Button>
                </Col>
                </FormGroup>
             </Form>
            </Fragment>
            
        );
        const {approvedby}=this.state;
        return(
            <div className="container">
                <h3>{this.props.eid} :</h3>
                <br/>
                {list4}
                <br/>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {approvedby.map(({Approver_Name,Trans_Datetime})=>(
                            <CSSTransition key={Trans_Datetime} timeout={500} classNames="fade">
                                <ListGroupItem >                                   
                                  <p>This form has already been approved by {Approver_Name} on {Trans_Datetime}</p>
                                </ListGroupItem>
                            </CSSTransition>
                        ))}

                    </TransitionGroup>
                </ListGroup>
                <br/>
               {(this.state.dep===1)?list3:list2}
               {(this.state.last===1)?list1:''}
            </div>
        )
    }
}


const mapStateToProps=state=>({
    hkey:state.item.hkey,
    auth:state.auth,
    eid:state.item.eid
  });

export default connect(mapStateToProps,{approval2})(Displaying1);