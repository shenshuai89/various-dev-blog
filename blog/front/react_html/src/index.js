import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from './views/App';
import Detail from './views/Detail';
import Login from './views/Login';



ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/" exact component={App}></Route>
      <Route path="/list" component={App}></Route>
      <Route path="/login" component={Login}></Route>
      <Route path="/detail/:id" component={Detail} ></Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);

