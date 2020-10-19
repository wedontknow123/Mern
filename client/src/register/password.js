import React,{Component} from 'react';
import {
  Button,
  Label,
  Form,
  FormGroup,
  Input,
  Col,
  CustomInput,
  NavItem,
  Breadcrumb, BreadcrumbItem

} from 'reactstrap';
import axios from 'axios';
var nodelink=require('../nodelink.json');

class Password extends Component{
    state={
        password1:'',
        password2:''
    }
    continue = e => {
        e.preventDefault();
        const info={
            Email:this.props.values.mail,
            Password:this.props.values.password
        }
        if(this.state.password1==this.state.password2 && this.state.password1!=''){

           axios.post(nodelink.site+"/api/register/password",info)
           .then(res=>{
            this.props.nextStep();
           })
        } 
            console.log(this.props.values)
        
        
      };
    
      back = e => {
        e.preventDefault();
        this.props.prevStep();
      };
      handleChangepass=e=>{
          this.setState({
              [e.target.name]:e.target.value
          },()=>{
            if(this.state.password1==this.state.password2 && this.state.password1!=''){
                this.props.handlepassword(this.state.password1)
                
                console.log(this.props.values)
            }
            else{
                console.log("Password doesn't match");
            }
          })
          
      }
    render(){
        const { values, handleChange } = this.props;
        
        return(
          <div>
            
                
             <Form>
            <FormGroup>
              <Label>Enter new password:</Label>
            <Input
            type='password'
              placeholder="Password"
              onChange={this.handleChangepass}
                  defaultValue={values.password}
                  name='password1'
            />
            </FormGroup>
            <FormGroup>
              <Label>Confirm new password:</Label>
            <Input
            type='password'
              placeholder="Password"
              onChange={this.handleChangepass}
                  defaultValue={values.password}
                  name='password2'
            />
            </FormGroup>
            <Button
              onClick={this.back}
            >Back</Button>
            <Button
              onClick={this.continue}
            >Confirm</Button>
            </Form>
          </div>
        )
    }
}

export default Password;