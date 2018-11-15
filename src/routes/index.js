import React from 'react'
import { Route, Switch } from 'react-router'

import Home from './Home';
import About from './About';
import Login from './Login';
import Register from './Register';


const routes = (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
    </Switch>
);

//    

export default routes;