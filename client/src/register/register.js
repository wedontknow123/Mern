import React,{Component} from 'react';
import { BreadcrumbItem ,Breadcrumb} from 'reactstrap';
import Form from './form';
class Register extends Component{
    
    render(){
        return(
            <div className='App'>
                <Breadcrumb style={{marginTop:'105px'}}>
                <BreadcrumbItem><a href="/">Home</a></BreadcrumbItem>
                 <BreadcrumbItem active>Register</BreadcrumbItem>
                 </Breadcrumb> 
                <h1 style={{textAlign:'center',marginTop:"100px"}}>Register</h1>
           <div  style={{border:"4px groove #000000",borderRadius:"11px 11px 11px 11px",
           width:"500px", height:"250px",marginLeft:'auto',marginRight:'auto',
           left:'0',right:"0"}}>
                <Form/>
            </div>
            </div>
        )
    }
}

export default Register;