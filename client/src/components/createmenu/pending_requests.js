import React,{Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container,ListGroup,ListGroupItem,Button,    Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {getEmpid,getHeaderkey} from '../../actions/itemActions';
import { Redirect,NavLink } from 'react-router-dom';
var nodelink=require('../../nodelink.json');
var n=1
class Pending_requests extends Component{
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
            axios.post(nodelink.site+'/api/apmaster/pending',this.state)
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
    handleclick=(emp,hkey)=>{
        this.props.getEmpid(emp);
        this.props.getHeaderkey(hkey);
        this.setState({
            next:"yes"
        })
    }
    render(){
        if(this.state.next==='yes'&&this.props.eid!==null){
            return <Redirect to='/requests/display'/>
        }
        const {empid}=this.state;
        const list1=(
            <Fragment>
                    <h2 style={{marginTop:'45px',marginBottom:'50px'}}>Select the employee that you would like to approve:</h2>                                

                 <Container>
                        <ListGroup>
                            <TransitionGroup >
              {empid.map(({Emp_ID,Emp_Name,UserAccess_Headerkey})=>(
                                    <CSSTransition key={UserAccess_Headerkey} timeout={500} classNames="fade">
                                        <ListGroupItem tag="button" style={{backgroundColor:'#998242',color:'#fff',borderRadius:'5px',marginBottom:'10px'}} onClick={this.handleclick.bind(this,Emp_ID,UserAccess_Headerkey)}> 
                                        {Emp_ID}-{Emp_Name}                                  
                                        </ListGroupItem>
                                    </CSSTransition>
                                ))}
                                </TransitionGroup>
                        </ListGroup>
                    </Container>
            </Fragment>
        )
        return(
            <div>
                <Breadcrumb style={{marginTop:'105px',marginBottom:'50px'}}>
                <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                <BreadcrumbItem active>Pending Requests</BreadcrumbItem>
                </Breadcrumb>
                <div className="container">                
                   
                {this.state.count==1?list1:<h1>You have no pending requests.</h1>}
              
                </div>

            </div>
            
        )
       
    }
}

const mapStateToProps=state=>({
    auth:state.auth,
    eid:state.item.eid,
    hkey:state.item.hkey
  });
export default connect(mapStateToProps,{getEmpid,getHeaderkey})(Pending_requests);