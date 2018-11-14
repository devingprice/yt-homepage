import React from 'react'
import { Route, Switch } from 'react-router'

import Home from './Home';
import About from './About';

const routes = (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
    </Switch>
);

export default routes;