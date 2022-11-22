import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from "../containers/Home/Home";
import Panel from "../containers/Panel/Panel"
import Wywoz from "../containers/Najbliższy wywoz/Wywoz";
import Lokalizacja from "../containers/Lokalizacja/Lokalizacja";
import Harmonogram from "../containers/Harmonogram/Harmonogram";
import Powiadomienia from "../containers/Powiadomienia/Powiadomienia";
import LoginPage from "../containers/LoginPage/LoginPage";
import PrivateRoute from "../utils/PrivateRoute";
import PanelLokalizacje from "../containers/PanelLokalizacje/PanelLokalizacje";
import PanelHarmonogram from "../containers/PanelHarmonogram/PanelHarmonogram";
import Zglos from "../containers/Zglos/Zglos";
import PanelZgloszenia from "../containers/PanelZgloszenia/PanelZgloszenia";

const Router = () => (
      <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/wywoz" component={Wywoz} />
          <PrivateRoute path="/panel/lokalizacje" component={PanelLokalizacje} />
          <PrivateRoute path="/panel/harmonogram" component={PanelHarmonogram} />
          <PrivateRoute path="/panel/zgloszenia" component={PanelZgloszenia} />
          <PrivateRoute path="/panel" component={Panel} />
          <Route path="/lokalizacja" component={Lokalizacja} />
          <Route path="/harmonogram" component={Harmonogram} />
          <Route path="/powiadomienia" component={Powiadomienia} />
          <Route path="/zglos" component={Zglos} />
          <Route path="/" component={Home} />
      </Switch>
);

export default Router;
