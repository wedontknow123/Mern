import React,{Component} from 'react';
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    Col,
    NavItem
} from 'reactstrap';
class home extends Component{
    render(){
        return(
            <div className="container">
                <Button href='/options'>New User Creation</Button>
                <br></br>
                <br></br>
                <Button href='/changes_required'>Changes Required</Button>
                <br></br>
                <br></br>
                <Button href='/deactivate'>Deactivation</Button>
                <br></br>
                <br></br>
                <Button href="/requests">Pending Requests</Button>
                <br></br>
                <br></br>
                <Button href="/rejected">Rejected Requests</Button>
            </div>
        )
    }
}

export default home;