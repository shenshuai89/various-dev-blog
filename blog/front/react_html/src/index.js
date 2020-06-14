import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './views/App';
import Detail from './views/Detail';
import Login from './views/Login';
import Admin from './views/Admin';
import Edit from './views/Edit';
import New from './views/New';



ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={App}></Route>
      <Route path="/list" component={App}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/admin" component={Admin}></Route>
      <Route path="/new" component={New}></Route>
      <Route path="/edit/:id" component={Edit}></Route>
      <Route path="/detail/:id" component={Detail} ></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

