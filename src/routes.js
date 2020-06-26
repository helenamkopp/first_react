import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import Payment from './pages/payment';

const Routes = () => (
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/payments/:id" component={Payment} />
    </Switch>
    </BrowserRouter>
);

export default Routes;