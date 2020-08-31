import React, {Component} from 'react';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShoppingList from './components/ShoppingList';
import {Provider} from 'react-redux';
import store from './store';
import ItemModal from './components/ItemModal';
import {Container,Button} from 'reactstrap';
import {BrowserRouter,Redirect,Route, NavLink} from 'react-router-dom';
import newuserform from './components/createmenu/newuserform';
import editdraftform from './components/createmenu/editdraftform';
import deleteform from './components/createmenu/deleteform';
import {loadUser} from './actions/authActions';
import PropTypes from 'prop-types';
import home from './components/home';
import createmenu from './components/createmenu/createmenu';
import changes_required from './components/changes_required/changes_required'
import changes_screen from './components/changes_required/changes_screen'
import deactivate from './components/deactivate/deactivate';
import screens_test from './components/createmenu/screens_test';
import screens_test_d from './components/createmenu/screens_test_d';
import pending_requests from './components/createmenu/pending_requests';
import displaying1 from './components/createmenu/displaying';
import Rejected_req from './components/createmenu/Rejected_req';
import displaying_rejected from './components/createmenu/displaying_rejected';
class App extends Component{
  componentDidMount(){
    store.dispatch(loadUser());
  }
  render(){
    
  return (
    <Provider store={store}>
      <BrowserRouter>
      
    <div className="App">
      
       <AppNavbar/>

      
      <Route exact path ='/options/newuser/screens_test' component={screens_test}/>
      <Route exact path ='/options/editdraftform/screens_test_d' component={screens_test_d}/>
      <Route exact path='/options/newuser' component={newuserform}/> 
      <Route exact path='/options/editdraftform' component={editdraftform}/> 
      <Route exact path='/options/deleteform' component={deleteform}/> 
      <Route exact path='/' component={home}/>
      <Route exact path='/options' component={createmenu}/>
      <Route exact path='/deactivate' component={deactivate}/>
      <Route exact path='/changes_required' component={changes_required}/>
      <Route exact path='/changes_required/changes_screen' component={changes_screen}/>
      <Route exact path='/requests' component={pending_requests}/>
      <Route exact path='/requests/display' component={displaying1}/>
      <Route exact path='/rejected' component={Rejected_req}/>
      <Route exact path='/rejected/display' component={displaying_rejected}/>

    </div>

    </BrowserRouter>
    </Provider>
  );
}
}

export default App;
//<ShoppingList/>
//<ItemModal/>