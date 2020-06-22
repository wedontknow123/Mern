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
import screens from './components/createmenu/screens';
import PropTypes from 'prop-types';
import home from './components/home';
import createmenu from './components/createmenu/createmenu';
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

      <Route exact path ='/options/newuser/screens' component={screens}/>
      <Route exact path='/options/newuser' component={newuserform}/> 
      <Route exact path='/options/editdraftform' component={editdraftform}/> 
      <Route exact path='/options/delete' component={deleteform}/> 
      <Route exact path='/' component={home}/>
      <Route exact path='/options' component={createmenu}/>
    </div>
    </BrowserRouter>
    </Provider>
  );
}
}

export default App;
//<ShoppingList/>
//<ItemModal/>