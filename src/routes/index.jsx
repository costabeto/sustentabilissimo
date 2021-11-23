import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Document from '../pages/Document';
import GNV from '../pages/GNV';
import GNVResult from '../pages/GNVResult';
import Home from '../pages/Home';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/gnv' component={GNV} />
        <Route exact path='/gnv/result' component={GNVResult} />
        <Route exact path='/documento' component={Document} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
