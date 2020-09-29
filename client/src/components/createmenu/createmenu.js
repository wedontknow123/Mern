import React,{Component} from 'react';
import '../menu.css';
import {
    Button,
    Label,
    Form,
    FormGroup,
    Input,
    Col,
    NavItem
} from 'reactstrap';
class Createmenu extends Component{
    render(){
        return(
            <div className="vuttons_2">
                <div className="row1"><Button className="bt-0" href='/options/newuser' title="Create New User">Create New User</Button></div>                
                <div className="row1"><Button className="bt-0" href='/options/editdraftform' title="Edit Saved User Details">Edit</Button></div>               
                <div className="row1"><Button className="bt-0" href="/options/deleteform" title="Delete Saved User">Delete</Button></div>                
            </div>
        )
    }
}

export default Createmenu;