import React, { Component,Fragment} from 'react';
import { Redirect,NavLink } from 'react-router-dom';
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
import MaterialTable from "material-table";
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import {getapprovalinfo,approval1} from '../../actions/itemActions';
var a='';
var dateFormat = require('dateformat');

class screens_test extends Component{
   
       
        state = {
          items: [],
          module: '',
          screens: [],
          selectedscreen: [],
          boola:false,
          //key:'',
          //empid:this.props.eid,
          data:[],
          done : '',
          itr:''
        };
   
         handleclick2=()=>{
           console.log(this.props);
           const info={
            UserAccess_Headerkey:this.props.hkey,
            Department:this.props.department
           }
            this.props.getapprovalinfo(info);

         }
        //  sendforapproval=()=>{
        //   const info={
        //     UserAccess_Headerkey:this.props.hkey,
        //     Employee_ID:this.props.eid,
        //     Approver_Name:this.props.approver_name,
        //     Approver_Email:this.props.approver_email
        //   }
        //   console.log(info);
        //   this.props.approval1(info);
        //  }
         componentDidUpdate(){
           console.log("1");
           if(this.state.itr===""){
            console.log("2");

             if(this.props.approver_name!==""){
              console.log("3");

              const info={
                UserAccess_Headerkey:this.props.hkey,
                Emp_ID:this.props.eid,
                Approver_Name:this.props.approver_name,
                Approver_Email:this.props.approver_email
              }
              console.log(info);
              this.props.approval1(info);
              this.setState({
                itr:"yes"
              })
             }
           }
         }
      handlechange = (values,event) => {
          if(event!==null){
           a=event.Module;   
        this.setState({
          module: a
        }, () => {
          axios.post('/api/screens_test',this.state)
          .then(res=>{
            var x=res.data             
            if(this.state.data.length!==0)
            {              
              var d = (this.state.data).map(da => {                                    
                  return da.sc
              })
              console.log(x)  
              console.log(d)                    
              const z = x.filter(function(item) {
                return !d.includes(item.Screens); 
              })              
              console.log(z)
              this.setState({
                  screens:z 
              })      
           }              
            else              
            this.setState({
                screens:x 
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
           console.log(this.state.selectedscreen)
           //this.getheader();
         });
         
     }
       if(event.length==0){
           console.log("lol");
           this.setState({
               boola:false
           })
       }

    }

  // getheader=()=>{
  //   axios.get('/api/items/key')
  //   .then(res=>{
  //     this.setState({
  //       key:res.data[0]['']
  //     })
  //     console.log(this.state.key)
  //   })
  // }

  //this will save the data to the database
   handleclick=(e)=>{
     
    var now = new Date();
    var i;
    console.log(this.props);
    for (i=0;i<this.state.data.length;i++){
       const new2={
           Emp_ID:this.props.eid,
           Module:this.state.data[i].mo,
           Screens:this.state.data[i].sc,
           Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
           UserAccess_Headerkey:this.props.hkey
          }
          axios.post('/api/screens_test/save',new2)
          .then(res=>{
            console.log(res);            
          })
          

        }
      this.setState({
        data:[],
        screens:[],
        module:'',
        selectedscreen:[],
        boola:false ,
        done : 'yes'
      })
        
   }

   //this will save the data into the table
   handleclick1=(e)=>{    
    
    var i;
     var d = 1
    var datas =[];
    var z = 'table.id'
    //console.log(this.state.key);
    for (i=0;i<this.state.selectedscreen.length;i++){ 

        var x ={ mo: this.state.module , sc: this.state.selectedscreen[i].Screens };
        console.log(x)
        datas[i] = x
        console.log(datas)      
    }
    var dataf = [...this.state.data].concat(datas)
    this.setState({
        data : dataf ,
        screens:[],
        module:'',
        selectedscreen:[],
        boola:false
        })
        
   }

    componentDidMount(){
      console.log(this.props)
        axios.get('/api/screens_test')
    .then(res=>{
       this.setState({
           items:res.data
       })
    })
    
    }
    
      
    render(){  
        if(this.state.done=='yes'){
            //return <Redirect to='/options/newuser/screens'/>
            return <Redirect to='/options'/>
        }

        
        
        const tableIcons = {
            Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
            Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
            Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} />),
            DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
            Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
            Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
            FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
            LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
            NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
            PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
            ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
            Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
            SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
            ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
            ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
          };

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
             <Button onClick={this.handleclick1} >Add the screens from {this.state.module} module</Button>
            </Fragment>
        );
        const list4=(
            <Fragment>
             <Button onClick={this.handleclick} >Save </Button>
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
            
            <br/>

            <MaterialTable
            title="Modules and Screens"
            style={{ width : "50%" }}
            columns={[
                { title: 'S.No', field:'tableData.id'  ,filtering: false},  //  'tableData.id'                     
                { title: 'Module', field: 'mo' },
                { title: 'Screen', field: 'sc', initialEditValue: 'initial edit value' }           
               ]}
            icons={tableIcons}
            data={this.state.data}            
            localization={{                
                header: {
                    actions: ''
                }}}            
            editable={{
                    
                onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                    setTimeout(() => {
                    const dataDelete = [...this.state.data];                    
                    console.log(oldData)
                    console.log(dataDelete)                    
                    const index = oldData.tableData.id;
                    console.log(index)
                    dataDelete.splice(index, 1);                
                    this.setState({ data : [...dataDelete]});
                    console.log(this.state.data)
                    
                    resolve()
                    }, 1000)
                }),
            }}
            options={{
                filtering: true,
                actionsColumnIndex: -1,
                search : false,
            }}
            /> 
            <br/>
            {(this.state.data.length)?list4:''}            
            
            <Button onClick={this.handleclick2}>Send for approval</Button>
           </div>
           
        )
    }
}

const mapStateToProps=state=>({
  item:state.item.items,
  hkey:state.item.hkey,
  eid:state.item.eid,
  department:state.item.department,
  approver_name:state.item.approver_name,
  approver_email:state.item.approver_email
});
export default connect(mapStateToProps,{getapprovalinfo,approval1})(screens_test);
//export default (screens_test);