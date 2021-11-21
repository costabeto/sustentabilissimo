import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import GNV from '../pages/GNV';
import GNVResult from '../pages/GNVResult';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/gnv' component={GNV} />
        <Route exact path='/gnv/result' component={GNVResult} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
