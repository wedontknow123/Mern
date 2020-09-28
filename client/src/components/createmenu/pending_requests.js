import React,{Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {getEmpid,getHeaderkey} from '../../actions/itemActions';
import { Redirect,NavLink } from 'react-router-dom';

var n=1
class Pending_requests extends Component{
    state={
        r:"",
        empid:[],
        Approver_Email:"",
        next:""
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
            axios.post('/api/apmaster/pending',this.state)
              .then(res=>{
              this.setState({
                  empid:res.data,
                  r : "yes"
              })
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
        return(
            <Container>
                
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {empid.map(({Emp_ID,UserAccess_Headerkey})=>(
                            <CSSTransition key={UserAccess_Headerkey} timeout={500} classNames="fade">
                                <ListGroupItem tag="button" style={{backgroundColor:'#998242',color:'#fff'}} onClick={this.handleclick.bind(this,Emp_ID,UserAccess_Headerkey)}>                                   
                                    {Emp_ID}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}

                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
       
    }
}

const mapStateToProps=state=>({
    auth:state.auth,
    eid:state.item.eid,
    hkey:state.item.hkey
  });
export default connect(mapStateToProps,{getEmpid,getHeaderkey})(Pending_requests);