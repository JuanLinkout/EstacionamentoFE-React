import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import CarrosRegistrar from './pages/CarrosRegistrar';
import CarrosBD from './pages/CarrosBD';
import CarrosEditar from './pages/CarrosEditar';
import Home from './pages/Home';

const links = [
  {
    path: '/',
    componentName: Home,
    exact: true,
  },
  {
    path: '/customer',
    //componentName: TodoList,
    exact: true,
  },
  {
    path: '/customer/register',
    //componentName: ,
    exact: true,
  },
  {
    path: '/carros',
    componentName: CarrosBD,
    exact: true,
  },
  {
    path: '/carros/registrar',
    componentName: CarrosRegistrar,
    exact: true,
  },
  {
    path: '/carros/:id',
    componentName: CarrosEditar,
    exact: true,
  },
];

const routes = props => (
  <Switch>
    {links.map(link => {
      return (
        <Route key={link.path} exact={link.exact} path={link.path} component={link.componentName} />
      )
    })}
    <Redirect from='*' to='/' />
  </Switch>
);

export default routes;