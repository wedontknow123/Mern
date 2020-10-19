import React,{Component} from 'react';
import './menu.css'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
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
class home extends Component{

    static propTypes={
        auth:PropTypes.object.isRequired
      }
      //this.props.auth.user === null
    
    
    render(){
        return(
            <div>
                <Breadcrumb style={{marginTop:'105px',padding:'0px 50px'}}>
                <BreadcrumbItem active>Home</BreadcrumbItem>                
                </Breadcrumb>
                {/* <div className="vuttons_1" >
                    
                    <div  >
                        <div className="row1"><Button className="bt-0" href='/options' title="Create New User">New User Creation</Button></div>
                        <div className="row1"><Button className="bt-1" href='/changes_required'title="Change User Data">Changes Required</Button></div>
                        <div className="row1"><Button className="bt-2" href='/deactivate' title="Deactivate User">Deactivation</Button></div>
                    </div>
                    <br/>
                    <div className="row2" >
                        <div className="row1"><Button className="bt-3" href="/requests" title="Check Pending Requests">Pending Requests</Button></div>
                        <div className="row1"><Button className="bt-4" href="/rejected" title="Check Rejected Requests">Rejected Requests</Button></div>
                        <div className="row1"><Button className="bt-4" href="/status" title="Check Rejected Requests">Status</Button></div>
                        <div className="row1"><Button className="bt-4" href="/register" title="register">Register</Button></div>

                    </div>                
                </div> */}
            </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.auth,
  });

export default connect(mapStateToProps)(home);