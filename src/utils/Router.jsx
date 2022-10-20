import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from "../containers/App/App";
import Home from "../containers/Home/Home";
import Wywoz from "../containers/Najbliższy wywoz/Wywoz";

const Router = () => (
      <Switch>
          <Route path="/login" component={App} />
          <Route path="/wywoz" component={Wywoz} />
          <Route path="/" component={Home} />
      </Switch>
);

export default Router;
