import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import GNV from '../pages/GNV';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/gnv' component={GNV} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
