import React,{Component} from 'react';
import Mail from './mail';
import Otp from './otp';
import Password from './password';
import Confirm from './confirm';
class Form extends Component{
    state={
        step:1,
        mail:"",
        otp:"",
        password:""
    }
    nextStep = () => {
        const { step } = this.state;
        this.setState({
          step: step + 1
        });
      };
      prevStep = () => {
        const { step } = this.state;
        this.setState({
          step: step - 1
        });
      };
      handlepassword=(a)=>{
          this.setState({
              password:a
          })
          console.log(a)
      }
      handleChange = input => e => {
        this.setState({ [input]: e.target.value });
      };
    render(){
        const { step } = this.state;
    const { mail,otp,password } = this.state;
    const values = { mail,otp,password };
    switch (step) {
        case 1:
          return (
            <Mail
              nextStep={this.nextStep}
              handleChange={this.handleChange}
              values={values}
            />
          );
        case 2:
          return (
            <Otp
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
          />          
          );
        case 3:
          return (
            <Password
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={values}
            handlepassword={this.handlepassword}
          />     
          );
        default:
          (console.log('This is a multi-step form built with React.'))
      }
    }
}

export default Form;