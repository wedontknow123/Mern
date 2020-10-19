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
import OTP1 from 'otp-client';
var dateFormat = require('dateformat');
const secret = 'TPQDAHVBZ5NBO5LFEQKC7V7UPATSSMFY'
const otp = new OTP1(secret)
var nodelink=require('../nodelink.json');
class Otp extends Component{
    continue = e => {
        e.preventDefault();
        const info={
            Email:this.props.values.mail,
            OTP:this.props.values.otp
        }
        axios.post(nodelink.site+"/api/register/validotp",info)
        .then(res=>{
            if(res.data.length>0){
                this.props.nextStep();
            }
        })
        console.log(info)
      };
    
      back = e => {
        e.preventDefault();
        this.props.prevStep();
      };
    
    render(){
        const { values, handleChange } = this.props;

        return(
          <div>
         
         <Form>
            <FormGroup>
              <Label>Enter OTP</Label>
            <Input
              placeholder="OTP"
              onChange={handleChange('otp')}
              defaultValue={values.otp}
            />
            </FormGroup>
            <Button
              onClick={this.back}
            >Back</Button>
            <Button
              onClick={this.continue}
            >Continue</Button>
            </Form>
      </div>
        )
    }
}

export default Otp;