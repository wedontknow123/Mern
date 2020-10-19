import React, { Component,Fragment } from 'react';
import{
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Button
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from './auth/RegisterModal';
import Logout from './auth/Logout';
import LoginModal from './auth/LoginModal';
import Trelleborglogo from '../Trellologo3.png';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Sidebar_1 from './Sidebar_1'
var a='';
class AppNavbar extends Component{
    state={
        isOpen:false,
        mail:''
    }
     static propTypes={
         auth:PropTypes.object.isRequired
     }
toggle=()=>{
    this.setState({
    isOpen:!this.state.isOpen
});
}
 
 render(){
    const{isAuthenticated,user}=this.props.auth;

    // const vert_align = {
    //     display: 'flex',
    //     width: 0,
    //     paddingRight: "0",
    //     paddingLeft: "0px",
    //     marginRight: "0px",
    //     marginLeft: "0px"
        
    // }

    const authLinks=(
        <Fragment>
          <NavItem>
              <span className="navbar-text mr-3">
                  <strong style={{fontSize:'19px'}}>{user?`Welcome ${user.Username}`:``}</strong>
              </span>
          </NavItem>
          <NavItem>
            <Logout/>
         </NavItem>
        </Fragment>
    );
     const guestLinks=(
        <Fragment>
           <NavItem>
             <RegisterModal/>
             </NavItem>
             
            <NavItem>
                <LoginModal/>
             </NavItem>
        </Fragment>
    );
     return(
    //  <div style={{position:"fixed"}}>
         <Navbar style={{backgroundColor:'#393939'}} dark  expand="sm" className="mb-5" fixed="top">
             <Container style={{paddingLeft:"0px",maxWidth:"1320px",marginLeft:"0px"}}>
                 <Sidebar_1/>
                 <NavbarBrand href="/" title="Home"><img src={Trelleborglogo} alt="logo" width="100" height="54" /></NavbarBrand>
                 <NavbarToggler onClick={this.toggle}/>
                 <Collapse isOpen={this.state.isOpen} navbar>
                     <Nav className="ml-auto" navbar>
                         {isAuthenticated?authLinks:guestLinks}                        
                     </Nav>
                 </Collapse>
             </Container>
           
         </Navbar>
    //  </div>
     );
 }
}
const mapStateToProps=state=>({
     auth:state.auth
});
export default connect(mapStateToProps, null)(AppNavbar);
