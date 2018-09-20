import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meet from './components/Meet/Meet';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import PrimateProfile from './components/PrimateProfile/PrimateProfile';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';


export default (
    <Switch>
        <Route path='/checkout' component={Checkout} />
        <Route path='/products/:id' component={ProductDetails} />
        <Route path='/products' component={Products} />
        <Route path='/add-primate/:id' component={Create} />
        <Route path='/add-primate' component={Create} />
        <Route path='/users/login' component={Login} />
        <Route path='/admin/login' component={Login} />
        <Route exact path='/meet-the-primates/:id' component={PrimateProfile} />
        <Route exact path='/meet-the-primates' component={Meet} />
        <Route path='/' component={Landing} />
    </Switch>
)