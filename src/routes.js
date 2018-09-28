import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Meet from './components/Meet/Meet';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import CreateProduct from './components/Create/CreateProducts';
import PrimateProfile from './components/PrimateProfile/PrimateProfile';
import Products from './components/Products/Products';
import ProductDetails from './components/ProductDetails/ProductDetails';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Volunteer from './components/Volunteer/Volunteer';
import About from './components/About/About';


export default (
    <Switch>
        <Route path='/about' component={About} />
        <Route path='/volunteer' component={Volunteer} />
        <Route path='/checkout' component={ShoppingCart} />
        <Route path='/products/:id' component={ProductDetails} />
        <Route path='/products' component={Products} />
        <Route path='/add-product/:id' component={CreateProduct} />
        <Route path='/add-product' component={CreateProduct} />
        <Route path='/add-primate/:id' component={Create} />
        <Route path='/add-primate' component={Create} />
        <Route path='/users/login' component={Login} />
        <Route path='/admin/login' component={Login} />
        <Route exact path='/meet-the-primates/:id' component={PrimateProfile} />
        <Route exact path='/meet-the-primates' component={Meet} />
        <Route path='/' component={Landing} />
    </Switch>
)