import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meet from './components/Meet/Meet';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Create from './components/Create/Create';


export default (
    <Switch>
        <Route path='/add-primate' component={Create} />
        <Route path='/login' component={Login} />
        <Route path='/meet-the-primates' component={Meet} />
        <Route path='/' component={Landing} />
    </Switch>
)