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
import { Redirect } from 'react-router-dom';
var nodelink=require('../nodelink.json');

class Password extends Component{
    state={
        password1:'',
        password2:'',
        count:0,
        a:false
    }
    continue = e => {
        e.preventDefault();
        //this.rev();
        const info={
            Email:this.props.values.mail.toLowerCase(),
            Password:this.props.values.password
        }
        if(this.state.password1==this.state.password2 && this.state.password1!=''){

           axios.post(nodelink.site+"/api/register/password",info)
           .then(res=>{
            //this.props.nextStep();
            this.setState({
              count:1
            })
           })
        }
        else{
          //this.rev();
          alert("Password doesn't match !")
        } 
            console.log(this.props.values)
        
        
      };
     rev=()=>{
       this.setState({
         a:!this.state.a
       })
     };
      back = e => {
        
        e.preventDefault();
        this.props.prevStep();
        this.rev();
      };
      handleChangepass=e=>{
          this.setState({
              [e.target.name]:e.target.value
          },()=>{
            if(this.state.password1==this.state.password2 && this.state.password1!=''){
                this.props.handlepassword(this.state.password1)
                
                console.log(this.props.values)
            }
            // else{
            //     console.log("Password doesn't match");
            // }
          })
          
      }
    render(){
        const { values, handleChange } = this.props;
        if(this.state.count==1){
          alert("Password successfully saved. You can now login using the new password.")
          return <Redirect to='/'/>
        }
        return(
          <div style={{marginLeft:"30px",marginTop:"30px"}}>
            
                
             <Form>
            <FormGroup row>
              <Label sm={5}>Enter new password:</Label>
            <Col sm={6}>
            <Input
            type='password'
              placeholder="Password"
              onChange={this.handleChangepass}
                  defaultValue={values.password}
                  name='password1'
            />
            </Col>
            </FormGroup >
            <FormGroup row>
              <Label sm={5}>Confirm new password:</Label>
              <Col sm={6}>
            <Input
            type='password'
              placeholder="Password"
              onChange={this.handleChangepass}
                  defaultValue={values.password}
                  name='password2'
            />
            </Col>
            </FormGroup>
            <Button style={{marginLeft:"120px"}}
              onClick={this.back}
              disabled={this.state.a}
            >Back</Button>
            <Button style={{marginLeft:"40px"}}
              onClick={this.continue}
              disabled={this.state.a}
            >Confirm</Button>
            </Form>
          </div>
        )
    }
}

export default Password;