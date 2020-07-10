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

var a='';
var dateFormat = require('dateformat');

class screens_test extends Component{


        state = {
          items1: [],
          items: [],
          empid: '',
          module: '',
          screens: [],
          selectedscreen: [],
          boola:false,
          key:'',
          data:[],
          done : ''
        };
        
        // for getting the empid selected and the key and accordingly set the table
        handlechange2 = (values,event) => {        // for combobox till the next @
          if(event!==null){                        //gotta fix backend
              var a=event.Emp_ID;
              console.log(a)
              this.setState({
                  empid: a
              }, () => {
              axios.post('/api/screens_test_d/hkey',this.state)
                .then(res=>{
                    console.log(res.data)
                    var r = res.data;
                    var x = r[0];
                    console.log(r);
                    this.setState({
                      empid:x.Emp_ID,
                      key:x.UserAccess_Headerkey,
                    })
                    console.log(this.state)
                    //do smthng abt data: [] here, to fill the table
                    axios.post('/api/screens_test_d/data',this.state)
                      .then(res=>{
                        console.log(res.data)
                        var datas =[];
                        var i;
                        for (i=0;i<res.data.length;i++){
                            var x ={ mo: res.data[i].Module , sc: res.data[i].Screens };
                            console.log(x)
                            datas[i] = x
                            console.log(datas)
                        }                        
                        this.setState({
                            data : datas,                 
                            })
                        
                        console.log(this.state)
                      })              
                })

              });
           }
          if(event==null){
              this.setState({
                empid:"",
                key:'',
              })
          }

         }                                  // @

      //controls the box that shows the screens in a selected module
      handlechange = (values,event) => {
          if(event!==null){
           a=event.Module;
        this.setState({
          module: a
        }, () => {
          axios.post('/api/screens_test_d',this.state)
          .then(res=>{
              //here
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

     // controls the box showing the selected screens
     handlechange1=(value,event)=>{
        if(event!==null){

         this.setState({
           boola: true,
           selectedscreen:event
         }, () => {
           console.log(this.state.selectedscreen)           
         });

     }
       if(event.length==0){
           console.log("lol");
           this.setState({
               boola:false
           })
       }

    }  
  //this will save the data to the database 
   handleclick=(e)=>{

    var now = new Date();
    var i;
    console.log(this.state.key);
    var x ={ UserAccess_Headerkey:this.state.key }
    axios.post('/api/screens_test_d/del',x)    
    .then(res=>{
      console.log(res);
    })
    for (i=0;i<this.state.data.length;i++){
       const new2={
           Module:this.state.data[i].mo,
           Screens:this.state.data[i].sc,
           Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
           UserAccess_Headerkey:this.state.key
          }         
          axios.post('/api/screens_test_d/save',new2)
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
    var datas =[];    
    console.log(this.state.key);
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
        // module:'', 
        selectedscreen:[],
        boola:false
        })

   }

    componentDidMount(){
      axios.get('/api/screens_test_d')
        .then(res=>{
          this.setState({
              items:res.data
       })
    })
      axios.get('/api/screens_test_d/empid')
        .then(res=>{
           this.setState({
               items1:res.data
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
        const filterOptions3 = createFilterOptions({   //for combo box till the next @
          matchFrom: 'start',
          stringify: (option) => option.Emp_ID,
        });
        const list5=(
          <Autocomplete
            id="Module"
            options={this.state.items}
            getOptionLabel={(option)=>option.Module}
            filterOptions={filterOptions1}
            style={{width:300}}
            onChange={this.handlechange}
            disabled={this.state.boola}
            renderInput={(params)=><TextField {...params} label="Module" variant="outlined"/>}
            />
        )


        return(
          <div>
            <Autocomplete
            id="EmpId"
            options={this.state.items1}
            getOptionLabel={(option)=>option.Emp_ID}
            filterOptions={filterOptions3}
            style={{width:300}}
            onChange={this.handlechange2}
            renderInput={(params)=><TextField {...params} label="EmpId" variant="outlined"/>}
            />
            <br/>
            {(this.state.empid != '' )?list5:''}
            <br></br>
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


           </div>

        )
    }
}

export default (screens_test);