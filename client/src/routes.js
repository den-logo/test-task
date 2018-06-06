import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import App from './App';


const redirect = () => <Redirect to={'/films'} />;

const routes = (
  <Switch>
    <Route exact path={'/'} component={redirect} />
    <Route path={'/films'} component={App} />
  </Switch>
);

export default routes;
