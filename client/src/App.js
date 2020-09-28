import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShoppingList from './components/ShoppingList';
import {Provider} from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import {Container,Button} from 'reactstrap';
import {BrowserRouter,Redirect,Route, NavLink} from 'react-router-dom';
import Newuserform from './components/createmenu/newuserform';
import Editdraftform from './components/createmenu/editdraftform';
import Deleteform from './components/createmenu/deleteform';
import {loadUser} from './actions/authActions';
import PropTypes from 'prop-types';
import home from './components/home';
import Createmenu from './components/createmenu/createmenu';
import Changes_required from './components/changes_required/changes_required'
import changes_screen from './components/changes_required/changes_screen'
import Deactivate from './components/deactivate/deactivate';
import screens_test from './components/createmenu/screens_test';
import screens_test_d from './components/createmenu/screens_test_d';
import Pending_requests from './components/createmenu/pending_requests';
import Displaying1 from './components/createmenu/displaying';
import Rejected_req from './components/createmenu/Rejected_req';
import Displaying_rejected from './components/createmenu/displaying_rejected';
class App extends Component{
  static propTypes={
    auth:PropTypes.object.isRequired
  }
  componentDidMount(){
    store.dispatch(loadUser());
    console.log(this.props)
  }
  requireAuth=()=>{
    if(this.props.auth.token === null){ 
      console.log("redirecting")
      alert("Login to access other functionalities")
      return true      
    }
    else{
      return false
    }
 }

  render(){
    
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
            <AppNavbar/>      
            <Route exact path='/options/newuser' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Newuserform/>))}/> 
            <Route exact path='/options/editdraftform' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Editdraftform/>))}/> 
            <Route exact path='/options/deleteform' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Deleteform/>))}/> 
            <Route exact path='/' component={home} />
            <Route exact path='/options' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Createmenu/>))}/>
            <Route exact path='/deactivate' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Deactivate/>))}/>
            <Route exact path='/changes_required' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Changes_required/>))}/>
            <Route exact path='/requests' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Pending_requests/>))}/>
            <Route exact path='/requests/display' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Displaying1/>))}/>
            <Route exact path='/rejected' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Rejected_req/>))}/>
            <Route exact path='/rejected/display' render={()=>(this.requireAuth()?(<Redirect to="/"/>):(<Displaying_rejected/>))}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}
}

const mapStateToProps=state=>({
  auth:state.auth,
});

export default connect(mapStateToProps)(App);