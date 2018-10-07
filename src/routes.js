import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './components/Login/Login';
import Create from './components/Create/Create';
import CreateProduct from './components/Create/CreateProducts';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Volunteer from './components/Volunteer/Volunteer';
import About from './components/About/About';
import DonateItems from './components/Donate/DonateItems';
import Oops from './components/Oops/Oops';
import MoreAbout from './components/About/MoreAbout';
import ProductsContainer from './components/ProductsContainer/ProductsContainer';
import PrimatesContainer from './components/PrimatesContainer/PrimatesContainer';


export default (
    <Switch>
        <Route exact path='/products-container' component={ProductsContainer} />
        <Route exact path='/donate' component={DonateItems} />
        <Route exact path='/about' component={MoreAbout} />
        <Route exact path='/volunteer' component={Volunteer} />
        <Route exact path='/checkout' component={ShoppingCart} />
        <Route exact path='/products/:id' component={ProductsContainer} />
        <Route exact path='/products' component={ProductsContainer} />
        <Route exact path='/add-product/:id' component={CreateProduct} />
        <Route exact path='/add-product' component={CreateProduct} />
        <Route exact path='/add-primate/:id' component={Create} />
        <Route exact path='/add-primate' component={Create} />
        <Route exact path='/admin/login' component={Login} />
        <Route exact path='/meet-the-primates/:id' component={PrimatesContainer} />
        <Route exact path='/meet-the-primates' component={PrimatesContainer} />
        <Route exact path='/' component={Landing} />
        <Route component={Oops} />
    </Switch>
)