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
class createmenu extends Component{
    render(){
        return(
            <div className="container">
                <Button href='/options/newuser'>Create New User</Button>
                <br></br>
                <br></br>
                <Button href='/options/editdraftform'>Edit</Button>
                <br></br>
                <br></br>
                <Button href="/options/deleteform">Delete</Button>
                
            </div>
        )
    }
}

export default createmenu;