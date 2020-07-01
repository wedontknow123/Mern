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
                <Button >Changes Regired</Button>
                <br></br>
                <br></br>
                <Button href='/deactivate'>Deactivation</Button>

            </div>
        )
    }
}

export default home;