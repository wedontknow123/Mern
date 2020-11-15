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
  NavLink,
  Tooltip,
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
            Email:this.props.values.mail.toLowerCase(),
            OTP:this.props.values.otp
        }
        axios.post(nodelink.site+"/api/register/validotp",info)
        .then(res=>{
            if(res.data.length>0){
                this.props.nextStep();
            }
            else{
              alert("OTP has expired or it's incorrect.")
            }
        })
        console.log(info)
      };
    
      back = e => {
        e.preventDefault();
        this.props.prevStep();
      };
     state={
       toggle:false
     }
     toggle=()=>{
       this.setState(prevState=>({
         toggle:!prevState.toggle
       }))
     }
     regen=()=>{
       var now=new Date();
       const token=otp.getToken()
       const info={
         Email:this.props.values.mail.toLowerCase(),
         OTP:token,
         Trans_Datetime:dateFormat(now,"yyyy-mm-dd H:MM:ss")
       }
       axios.post(nodelink.site+"/api/register/otp",info)
       .then(res=>{
          console.log(info);
       }
       )
     }
    render(){
        const { values, handleChange } = this.props;
        
        return(
          <div style={{marginLeft:'70px',marginTop:'50px'}}>
         
         <Form>
         
            <FormGroup row>
              <Label sm={3}>Enter OTP :</Label>
              <Col sm={7}>
            <Input
              placeholder="OTP"
              onChange={handleChange('otp')}
              defaultValue={values.otp}
            />
            </Col>
            </FormGroup>
            <Button 
              onClick={this.back}
              style={{marginLeft:"80px"}}
            >Back</Button>
            <Button style={{marginLeft:"40px"}}
              onClick={this.continue}
            >Continue</Button>
            <br></br>
            <Button id="tooltip" style={{marginLeft:"90px",marginTop:'10px'}} onClick={this.regen}>Regenerate OTP</Button>
            <Tooltip placement="right" isOpen={this.state.toggle} target="tooltip" toggle={this.toggle}>
            Generate it only if you your previous OTP has expired.
            </Tooltip>
            <br/>
            <Label style={{color:'black',fontSize:'20px',marginLeft:'40px' }} >OTP is valid only for 48 hours.</Label>
            </Form>
            
      </div>
        )
    }
}

export default Otp;