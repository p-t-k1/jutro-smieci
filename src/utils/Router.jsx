import React from 'react';
import { Route, Switch } from 'react-router-dom';

import App from "../containers/App/App";
import Home from "../containers/Home/Home";
import Wywoz from "../containers/Najbliższy wywoz/Wywoz";
import Lokalizacja from "../containers/Lokalizacja/Lokalizacja";
import Harmonogram from "../containers/Harmonogram/Harmonogram";
import Powiadomienia from "../containers/Powiadomienia/Powiadomienia";

const Router = () => (
      <Switch>
          <Route path="/login" component={App} />
          <Route path="/wywoz" component={Wywoz} />
          <Route path="/lokalizacja" component={Lokalizacja} />
          <Route path="/harmonogram" component={Harmonogram} />
          <Route path="/powiadomienia" component={Powiadomienia} />
          <Route path="/" component={Home} />
      </Switch>
);

export default Router;
