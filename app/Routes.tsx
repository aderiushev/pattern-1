/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import MainPage from './containers/MainPage';

export default function Routes() {
  // @ts-ignore
  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={HomePage} exact={true} />
        <Route path={routes.MAIN} component={MainPage} />
      </Switch>
    </App>
  );
}
