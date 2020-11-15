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
class Mail extends Component{
    continue = e => {
        e.preventDefault();
        const info={
            Email:this.props.values.mail.toLowerCase()
        }
        console.log(this.props.values.mail.toLowerCase());
        axios.post(nodelink.site+"/api/register",info)
        .then(res=>{            
            var now = new Date();
            console.log(res.data.length)
            if(res.data.length==1){
                const token = otp.getToken()
                const info2={
                    Email:this.props.values.mail.toLowerCase(),
                    OTP:token,
                    Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss ")
                }
                axios.post(nodelink.site+"/api/register/date",info)
                .then(res=>{
                  console.log(res.data[0].diff)
                  if(res.data[0].diff==null||res.data[0].diff>48){              
                  axios.post(nodelink.site+"/api/register/otp",info2)
                  .then(res=>{
                      console.log(dateFormat(now, "yyyy-mm-dd H:MM:ss "))
                      this.props.nextStep();
                  })
                  }
                  else{
                      this.props.nextStep();
                  }
                  })
                console.log(info2);
            }
            else{
              alert("Email does not exist !")
            }
        })
      };
    
     
    render(){
        const { values, handleChange } = this.props;
        return(
        <div className='app' style={{marginLeft:'90px',marginTop:'60px'}} >
          <Form >
            <FormGroup row >
              <Label sm={2}>Email:</Label>
              <Col sm={8}>
            <Input
              placeholder="Enter Your Mail ID"
              type='email'
              onChange={handleChange('mail')}
              defaultValue={values.mail}
            />
            </Col>
            </FormGroup>
            <br></br>
            <Button style={{marginLeft:"120px"}}
              onClick={this.continue}
            >Continue</Button>
            </Form>
        </div>
        )
    }
}

export default Mail;