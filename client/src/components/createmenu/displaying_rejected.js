import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Button} from 'reactstrap';
import PropTypes from 'prop-types';

class displaying_rejected extends Component{
    state={
        info:[]
    }
    componentDidMount(){
       
        console.log(this.props)
        var a=String(this.props.key)
        const info={
            Emp_ID:this.props.eid,
            UserAccess_Headerkey:String(this.props.hkey)
        }
        
        axios.post('/api/apmaster/display',info)
          .then(res=>{
          this.setState({
              info:res.data
          })
            console.log(this.state.info);                      
          })
  
}
    static propTypes={
        auth:PropTypes.object.isRequired
    }
    handleclick1=()=>{
        const info={
            UserAccess_Headerkey:String(this.props.hkey),
            Department:this.state.info[0].Emp_Department
        }
        axios.post('/api/apmaster',info)
        .then(res=>{
            console.log(res)
            const info1={
                UserAccess_Headerkey:this.props.hkey,
                Emp_ID:this.props.eid,
                Approver_Name:res.data[0].Approver_Name,
                Approver_Email:res.data[0].Email
              }
              console.log(info1);
            axios.post('/api/apmaster/submit',info1)
            .then(res=>{
               console.log(res);
             })
            
        })
    }
    render(){
        return(
            <div>
               <h1> edit draft form + the reason why it was rejected(only this should be disabled) </h1>
             <Button onClick={this.handleclick1}>Submit</Button>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    hkey:state.item.hkey,
    auth:state.auth,
    eid:state.item.eid
  });

export default connect(mapStateToProps)(displaying_rejected);