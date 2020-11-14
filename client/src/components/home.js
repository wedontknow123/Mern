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
            <div >
                <Breadcrumb style={{marginTop:'105px',padding:'0px 50px'}}>
                <BreadcrumbItem active>Home</BreadcrumbItem>                
                </Breadcrumb>
                <h1 style={{textAlign:"center"}}>Welcome to</h1>
                <h1 style={{textAlign:"center"}}>FS UserAccess Management System</h1>
                <br></br>
                <br></br>
                <h4 style={{textAlign:"center" ,padding:"0px 50px"}}>Start by clicking the menu buuton  on the top right corner of the screen.
                 Select the screen that you would like to use. Log in before accessing any screen.
                
                    If you are unable register with your official email, contact the IT department. </h4>

                    <br></br>
                    <br></br>
                    <h1 style={{
fontFamily: "Impact,Charcoal, sans-serif",
fontSize: "80px",
letterSpacing: "-1.8px",
wordSpacing: "1px",
color: "#151FB8",
textDecoration: "none solid rgb(68, 68, 68)",
fontStyle: "normal",
fontvariant: "normal",
texttransform: "uppercase",
fontWeight:"600",
textAlign:"center"
}}>FOURTH SHIFT</h1>

            </div>
        )
    }
}

const mapStateToProps=state=>({
    auth:state.auth,
  });

export default connect(mapStateToProps)(home);