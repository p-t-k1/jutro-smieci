import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from "../containers/Home/Home";
import Panel from "../containers/Panel/Panel"
import Wywoz from "../containers/Najbliższy wywoz/Wywoz";
import Lokalizacja from "../containers/Lokalizacja/Lokalizacja";
import Harmonogram from "../containers/Harmonogram/Harmonogram";
import Powiadomienia from "../containers/Powiadomienia/Powiadomienia";
import LoginPage from "../containers/LoginPage/LoginPage";

const Router = () => (
      <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/wywoz" component={Wywoz} />
          <Route path="/panel" component={Panel} />
          <Route path="/lokalizacja" component={Lokalizacja} />
          <Route path="/harmonogram" component={Harmonogram} />
          <Route path="/powiadomienia" component={Powiadomienia} />
          <Route path="/" component={Home} />
      </Switch>
);

export default Router;
