import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';
class RegisterModal extends Component{
    
   state={
       modal:false,
       name:"",
       email:"",
       password:"",
       msg:null
   }

   static propTypes={
       isAuthenticated:PropTypes.bool,
       error:PropTypes.object.isRequired,
       register: PropTypes.func.isRequired,
       clearErrors: PropTypes.func.isRequired
   };
   
   componentDidUpdate(prevProps){
       const {error,isAuthenticated}=this.props;
       if(error!= prevProps.error){
           if(error.id==='REGISTER_FAIL'){
               this.setState({msg:error.msg.msg});
           }else{
               this.setState({msg:null});
           }
       }

       if(this.state.modal){
           if(isAuthenticated){
               this.toggle();
           }
       }
   }

   toggle=()=>{

       this.props.clearErrors();
       this.setState({
           modal:!this.state.modal
       });
   }

   onChange = (e) => {

    const value=e.target.value;
    this.setState({[e.target.name]:value});
       console.log(e.target.name)
   }
   onSubmit=(event)=>{
       event.preventDefault();
       //const {name,email,password}=this.state;

       const newUser={
           name:this.state.name,
           email:this.state.email,
           password:this.state.password
       };
       console.log(newUser);
       this.props.register(newUser);

       //this.toggle();
   }

   render(){
       return(
           <div>
              <NavLink onClick={this.toggle} href="#" style={{fontSize:'20px'}}>Register</NavLink>
        
           <Modal
           isOpen={this.state.modal} 
           toggle={this.toggle}>
           <ModalHeader toggle={this.toggle}>Register</ModalHeader>
           <ModalBody>
             {this.state.msg?(<Alert color="danger">{this.state.msg}</Alert>):null}
               <Form onSubmit={this.onSubmit}>
                   <FormGroup>
                       <Label for="name">Name</Label>
                       <Input
                       type="text"
                       id="name"
                       name="name"
                       className='mb-3'
                       placeholder="Name"
                       onChange={this.onChange}
                       />
                        <Label for="email">Email</Label>
                       <Input
                       type="email"
                       id="email"
                       name="email"
                       className='mb-3'
                       placeholder="Email"
                       onChange={this.onChange}
                       />
                        <Label for="password">Password</Label>
                       <Input
                       type="password"
                       id="password"
                       name="password"
                       className='mb-3'
                       placeholder="Password"
                       onChange={this.onChange}
                       />
                       <Button
                       style={{marginTop:'2rem',backgroundColor:'#393939'}}
                       block
                       >Register</Button>
                   </FormGroup>
               </Form>
           </ModalBody>
           </Modal>
           </div>
       );
   }
}

const mapStateToProps=state=>({
  isAuthenticated:state.auth.isAuthenticated,
  error:state.error
});
export default connect(mapStateToProps,{register,clearErrors})(RegisterModal);