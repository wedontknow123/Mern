import React,{Component,Fragment} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';
import {approval2} from '../../actions/itemActions';
import { Alert } from 'reactstrap';
import { Redirect,NavLink } from 'react-router-dom';

var dateFormat = require('dateformat');
var now = new Date();
var n=1;
class displaying1 extends Component{
    state={
        info:[],
        reason1:"",
        last:0,
        useremail:"",
        r:"",
        depart:0
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
            
            axios.post('/api/apmaster/display',info)
              .then(res=>{
              this.setState({
                  info:res.data
              })
                console.log(this.state.info);                      
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
            axios.post('/api/apmaster/checkingIT',info5)
              .then(res=>{
              this.setState({
                  r : "yes"
              })
              console.log(res.data)
              if(res.data.length==1){
                  console.log("1");
                  this.setState({
                      depart:1
                  })
                  console.log(this.state.depart)
              }                    
              })
              console.log(this.state)
              n = n+1
          }
        }
      }
    }
    handleclick1=()=>{
        const info={
          Status:'A',
          Reason:this.state.reason1,
          UserAccess_Headerkey:String(this.props.hkey),
          Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
          Approver_Email: this.props.auth.user.Email,
          Emp_ID:this.props.eid
        }
        console.log(info);
        axios.post('/api/apmaster/previous',info)
        .then(res=>{
        console.log(res);
        axios.post('/api/apmaster/approval',info)
        .then(res=>{
             const info1={
                 UserAccess_Headerkey:String(this.props.hkey),
                 Department:this.state.info[0].Emp_Department
             }
             axios.post('/api/apmaster',info1)
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
                 axios.post('/api/apmaster/submit',info2)
                 .then(res=>{
                    console.log(res);
                  })
                 }
                 else{
                     const info3={
                         UserAccess_Headerkey:String(this.props.hkey),
                         Approver_Email: this.props.auth.user.Email
                     }
                     axios.post('/api/apmaster/finalApprover',info3)
                     .then(res=>{
                        this.setState({
                            last:1
                        })
                     })
                     
                    
                 }
                })
         })
        })
    }
    handle_rejection=()=>{
        const info={
            Status:'R',
            Reason:this.state.reason1,
            UserAccess_Headerkey:String(this.props.hkey),
            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
            Approver_Email: this.props.auth.user.Email,
            Emp_ID:this.props.eid
          }
          axios.post('/api/apmaster/approval',info)
          .then(res=>{
              console.log(res);
          })
    }
    render(){
        const list1=(
            <Fragment>
             <Alert color="success">
                UserAccess Form Approved!
             </Alert>
            </Fragment>
            
        );
        console.log(this.props.eid);
        const list2=(console.log(this.state.depart),
            <Fragment>
             <Button onClick={this.handleclick1}>Approve</Button>
               <Button onClick={this.handle_rejection}>Reject</Button>
            </Fragment>
            
        );
        const list3=(
            <Fragment>
             <h1>it fuck yeah man</h1>
            </Fragment>
            
        );
        return(
            <div>
                <br></br>
               {(this.state.depart===1)?list3:list2}
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

export default connect(mapStateToProps,{approval2})(displaying1);