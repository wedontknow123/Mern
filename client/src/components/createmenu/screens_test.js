import React, { Component,Fragment} from 'react';
import { Redirect,NavLink } from 'react-router-dom';
import {Container,ListGroup,ListGroupItem,Button,Label,Form,FormGroup,Col,Input} from 'reactstrap';
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
import {getapprovalinfo,approval1,getHeaderkey} from '../../actions/itemActions';
import { UploaderComponent  } from '@syncfusion/ej2-react-inputs';
var nodelink=require('../../nodelink.json');
var a='';
var dateFormat = require('dateformat');
// const validateForm = (errors) => {
//   let valid = "Valid";
//   Object.values(errors).forEach(
//     (val) => val.length > 0 && (valid = "Invalid")
//   );
//   return valid;
// }

class Screens_test extends Component{
        uploadObj = new UploaderComponent();
       
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
          itr:'',
          valid:'',
          reasonl:'',
          reason:'',
          mod:0,
          key:'',
          a1:0,
          a2:0
        };

         handleclick2=()=>{
           console.log("Approval button was pressed")
           let fields = this.props.Fields
          //  this.validate()
           if(this.props.Eid===null || this.props.Department==="" || this.state.data.length==0 || fields.branch==="" || fields.name==="" || fields.desig==="" || fields.email===null || fields.filepath===null || fields.dog===""){//
            alert("Fill all the fields !")
           }
           else{
            let errors=this.props.Errors
          //   if(errors.empid.length>0 || errors.email.length>0 || errors.name.length>0|| errors.doj.length>0){
          //     alert("Correct the errors (in red) and try again !")}
            if(window.confirm('Are you sure you want to SEND FOR APPROVAL ?')){
              console.log(this.props);
              document.getElementById("approval").disabled=true;
              //this.props.getapprovalinfo(info); 
              this.setState({
                itr:'yes'
              })
                this.getheader();
                
              
              
            }
            else{
              document.getElementById("approval").disabled=false;
            }
          }
         }

          componentDidUpdate(){

            if(this.state.a1===0){
             if(this.props.hkey!==''){
               this.final_s();
               this.setState({
                 a1:1
               })
             }
            }
          }

      //handles the screens-list
      handlechange = (values,event) => {
          if(event!==null){
           a=event.Module;
        this.setState({
          module: a
        }, () => {
          axios.post(nodelink.site+'/api/screens_test',this.state)
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

    handlechange2=(e)=>{
      const { name, value } = e.target; 
      let reasonl = this.state.reasonl;  
      switch (name) {          
          case 'reason': 
              reasonl = `${value.length}/150`                
              break;                
          default:
              break;
      }    
      this.setState({reasonl, [name]: value})
  }

     //handles the selected screen
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
           this.setState({
               boola:false
           })
       }

    }
    getheader=()=>{
      var v='';
      axios.get(nodelink.site+'/api/items/key')
      .then(res=>{
          v=res.data[0][''];
          console.log(v);
          if(v==null){
             this.setState({
                 key:1
             })
          }
          else {
              v=v+1
              console.log("now getting header key")
              this.setState({
                  key:v
              },()=>{
                     this.props.getHeaderkey(this.state.key)
              })
          }
      })
  }
    final_s=()=>{
      let v = this.uploadObj.getFilesData()
      document.getElementById("approval").disabled=true;
      document.getElementById("draft").disabled=true;   
      var now = new Date();
      var i;
      for (i=0;i<this.state.data.length;i++){
        const new2={
            Emp_ID:this.props.Eid,
            Module:this.state.data[i].mo,
            Screens:this.state.data[i].sc,
            Trans_Datetime:dateFormat(now, "yyyy-mm-dd H:MM:ss "),
            UserAccess_Headerkey:this.props.hkey
            }
            axios.post(nodelink.site+'/api/screens_test/save',new2)
            .then(res=>{
              console.log("now saving screens");
            })
          }
          this.props.FSubmit(this.state.itr,v,this.state.reason);
    }

  //this will save the data to the database
   handleclick=(e)=>{
     
    if(this.props.Eid===null || this.props.Department==="" ){//
      alert("Fill all the * (Required) fields !")
    }    
   else{
     if(e.target.id==="draft"){
      if(window.confirm('Are you sure you want to SAVE AS DRAFT ?')){
        this.getheader();       
      }
      else{
        document.getElementById("draft").disabled=false;
      }
     }
     else{
      this.getheader();
     }
    }
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
        boola:false,
        mod:1
        },()=>{
          this.setState({
            mod:0
          })

        })
   }

    componentDidMount(){
      console.log(this.props)
        axios.get(nodelink.site+'/api/screens_test')
    .then(res=>{
       this.setState({
           items:res.data
       })
    })

    }


    render(){

    //   if(this.props.Hkey===null|| this.props.Eid===null){            
    //     console.log("goin back!")
    //     return <Redirect to='/options'/>     //the final return should be inside an else ....         
    // }

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
             <Button onClick={this.handleclick1} style={{backgroundColor:'#393939'}}>Add the screens from {this.state.module} module</Button>
            </Fragment>
        );
        const list4=(
            <Fragment>
             <Button onClick={this.handleclick} style={{margin:5, backgroundColor:'#393939'}} id="draft" >Save as Draft</Button>
            </Fragment>
        );
        const filterOptions1 = createFilterOptions({
          matchFrom: 'start',
          stringify: (option) => option.Module,
        });
        const list5=(
          <Fragment>
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
          </Fragment>
        );
        

          // <span className="required" style={{color:'red',fontSize:'20px'}}>*</span>
        return(
           <div>
             <div style={{position:'absolute'}} >
                <Label name="screens">Choose Screens :</Label>
                <br/>
                {(this.state.mod==0)?list5:''}
                <br/>
                {(this.state.screens.length&&this.state.module)?list2:''}
                {(this.state.selectedscreen.length)?list3:''}
             </div>
             <br/>
             <div>
                <MaterialTable
                title="Modules and Screens"
                style={{ width : "50%" , marginRight:'70px',  marginLeft:'auto',position:'static'}}
                columns={[
                    { title: 'S.No', field:'tableData.id' , render:rowData => { return( <p>{rowData.tableData.id+1}</p> ) }, filtering: false},  //  'tableData.id'
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
             </div>              
             <br/>
             <FormGroup row>
                  <br/>
                  <hr width="90%" size="15" ></hr>
                  <br/><br/>
                <Label for="exampleCustomFileBrowser"sm={3}>Attach file:</Label>
                <Col sm={5}>
                <UploaderComponent type="file" autoUpload={false} ref = { upload => {this.uploadObj = upload}} asyncSettings={this.path} />                               
                </Col>
              </FormGroup>
             <FormGroup row>
                <Label for="exampleText"sm={3}>Remarks:</Label>
                <Col sm={5}>
                <Input type="textarea" name="reason" id="reason" maxLength='150' onChange={this.handlechange2}/>
                {this.state.reason.length > 0 && <span className='error' style={{color:"red"}}>{this.state.reasonl}</span>}
                </Col>
             </FormGroup>
             <br/>            
             {list4}
             <Button onClick={this.handleclick2} id="approval" style={{backgroundColor:'#393939'}}>Send for approval</Button>
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
export default connect(mapStateToProps,{getHeaderkey,getapprovalinfo,approval1})(Screens_test);
//export default (screens_test);