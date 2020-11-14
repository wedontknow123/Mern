import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container,ListGroup,ListGroupItem,Button,Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {getEmpid,getHeaderkey,getReason} from '../../actions/itemActions';
import { Redirect,NavLink } from 'react-router-dom';
var nodelink=require('../../nodelink.json');
var n=1
class Rejected_req extends Component{
    state={
        r:"",
        empid:[],
        Approver_Email:"",
        next:"",
        count:0
    }
    static propTypes={
        auth:PropTypes.object.isRequired
      }
    componentDidUpdate(){
        if(this.state.r === ""){
        if(this.props.auth.user !== null){
          //console.log(this.props)
          if(this.state.Approver_Email===""){
            var e = this.props.auth.user.Email
            console.log(e)
            this.setState({
                Approver_Email: this.props.auth.user.Email
              }) 
            console.log(this.state.Approver_Email)} 
           else if(n==1){ 
            console.log(this.props)
            const info1={
                "User_Email":this.state.Approver_Email
            }
            axios.post(nodelink.site+'/api/apmaster/rejected',info1)
              .then(res=>{
              this.setState({
                  empid:res.data,
                  r : "yes"
              })
              if(this.state.empid.length>0){
                  this.setState({
                      count:1
                  })
              }
                console.log(this.state)                      
              })
              n = n+1
          }
        }
      }
    }
    handleclick=(emp,hkey,reason)=>{
        this.props.getEmpid(emp);
        this.props.getHeaderkey(hkey);
        this.props.getReason(reason)
        this.setState({
            next:"yes"
        })
    }
    render(){
        if(this.state.next==='yes'&&this.props.eid!==null){
            return <Redirect to='/rejected/display'/>
        }
        const {empid}=this.state;
        const list1=(
            <Container>                                 
            <ListGroup>
                <TransitionGroup >
                    {empid.map(({Emp_ID,UserAccess_Headerkey,Reasons,Emp_Name})=>(
                        <CSSTransition key={UserAccess_Headerkey} timeout={500} classNames="fade">
                            <ListGroupItem tag="button" style={{backgroundColor:'#998242', color:'#fff',borderRadius:'5px',marginBottom:'10px'}}  onClick={this.handleclick.bind(this,Emp_ID,UserAccess_Headerkey,Reasons)}>                                   
                                {Emp_ID}-{Emp_Name}
                            </ListGroupItem>                                
                        </CSSTransition>                            
                    ))}                        
                </TransitionGroup>                    
            </ListGroup>
            <br></br>
        </Container>
        )
        return(
            <div>
                <Breadcrumb style={{marginTop:'105px',marginBottom:'50px'}}>
                <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                <BreadcrumbItem active>Rejected Requests</BreadcrumbItem>
                </Breadcrumb>
                <div className="container">                
                   {this.state.count==1?list1:<h1>You have no rejected requests.</h1>}
                </div>
            </div>
            
        )
       
    }
}

const mapStateToProps=state=>({
    auth:state.auth,
    eid:state.item.eid,
    hkey:state.item.hkey,
    reason:state.item.reason
  });
export default connect(mapStateToProps,{getEmpid,getHeaderkey,getReason})(Rejected_req);