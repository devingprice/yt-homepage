import React from 'react'
import { Route, Switch } from 'react-router'

import Home from './Home';
import About from './About';
import Login from './Login';
import Register from './Register';
import Collection from './Collection';

import FakeTest from './FakeTest';


const routes = (
    <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/collection/:collectionId" component={Collection} />
        <Route path="/:id" component={FakeTest} />
    </Switch>
);

export default routes;

/*
 React Router has an issue with Redux blocking updates when its wrapped around the router
 https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
 This stops me from wrapping whole app, for now I will duplicate the code that would go in APP in each path component
 */

