import React, { Component,Fragment } from 'react';
import {Container,ListGroup,ListGroupItem,Button} from 'reactstrap';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {connect} from 'react-redux';
import {getItems,addItem2} from '../../actions/itemActions';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Autocomplete,{createFilterOptions} from '@material-ui/lab/Autocomplete';
import axios from 'axios';

var a='';
var dateFormat = require('dateformat');

class screens extends Component{
       
        state = {
          items: [],
          module: '',
          screens: [],
          selectedscreen: [],
          boola:false,
          key:''
        };
           
      handlechange = (values,event) => {
          if(event!==null){
           a=event.Module;   
        this.setState({
          module: a
        }, () => {
          axios.post('/api/screens',this.state)
          .then(res=>{
              this.setState({
                  screens:res.data
              })
              console.log(this.state.screens)
          })
          
        });
    }
        if(event==null){
            this.setState({
                screens:[],
                module:''
            })
        }
    
    }
     handlechange1=(value,event)=>{
        if(event!==null){ 
            
         this.setState({
           boola: true,
           selectedscreen:event
         }, () => {
           console.log(this.state.selectedscreen[0])
           this.getheader();
         });
         
     }
       if(event.length==0){
           console.log("lol");
           this.setState({
               boola:false
           })
       }

    }

  getheader=()=>{
    axios.get('/api/items/key')
    .then(res=>{
      this.setState({
        key:res.data[0]['']
      })
    })
  }
   handleclick=(e)=>{
     
    var now = new Date();
    var i;
    console.log(this.state.key);
    for (i=0;i<this.state.selectedscreen.length;i++){
       const new2={
           Module:this.state.module,
           Screens:this.state.selectedscreen[i].Screens,
           Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
           UserAccess_Headerkey:this.state.key
          }
          axios.post('/api/screens/save',new2)
          .then(res=>{
            console.log(res);
          })

        }
      this.setState({
        screens:[],
        module:'',
        selectedscreen:[],
        boola:false
      })
        
   }

    componentDidMount(){
        axios.get('/api/screens')
    .then(res=>{
       this.setState({
           items:res.data
       })
    })
    
    }
    
      
    render(){
        const filterOptions2 = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.Screens,
          });
        const list2=(
            
            <Fragment>
               <Autocomplete
               multiple
                id="tags-outlined"
                options={this.state.screens}
                getOptionLabel={(option) => option.Screens}
                style={{width:300}}
                filterOptions={filterOptions2}
                filterSelectedOptions
                onChange={this.handlechange1}
                 renderInput={(params) => (
                 <TextField
                  {...params}
                   variant="outlined"
                   label="screens"
                   placeholder="screens"
                 />
                 )}
                 /><br></br>
                          
                 </Fragment>
         );
        const list3=(
            <Fragment>
             <Button onClick={this.handleclick} >save the screens from {this.state.module} module</Button>
            </Fragment>
        );
        const filterOptions1 = createFilterOptions({
            matchFrom: 'start',
            stringify: (option) => option.Module,
          });
         
         
        return(
           <div>
            <Autocomplete
            id="Module"
            options={this.state.items}
            getOptionLabel={(option)=>option.Module}
            filterOptions={filterOptions1}
            style={{width:300}}
            onChange={this.handlechange}
            disabled={this.state.boola}
            renderInput={(params)=><TextField {...params} label="Module" variant="outlined"/>}
            /><br></br>
            {(this.state.screens.length&&this.state.module)?list2:''}  
            {(this.state.selectedscreen.length)?list3:''}  
           </div>
           
        )
    }
}

export default (screens);