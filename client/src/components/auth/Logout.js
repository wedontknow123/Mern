import React, {Component,Fragment} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import {logout} from '../../actions/authActions';
import PropTypes from 'prop-types';

export class Logout extends Component{

    static propTypes={
        logout: PropTypes.func.isRequired
    }
   
    render(){
        
        return(
            <div>
            <Fragment>
              <NavLink onClick={
              this.props.logout
            }
              href="/" style={{fontSize:'20px'}}>Logout</NavLink>
            </Fragment>
            </div>
        );
    }
}

export default connect(
    null,
    {logout}
)(Logout);