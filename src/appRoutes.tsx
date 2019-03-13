import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import AuthorizationService from "./services/authorization";
import Login from "./pages/publicPages/login";
import SignUp from "./pages/publicPages/signUp";
import FrontPage from "./pages/frontPage";
import TradeScreen from "./pages/tradeScreen";
import AdminPage from "./pages/adminPage";
import createHistory from "history/createBrowserHistory";
import Menu from "./components/menu";

const authService = new AuthorizationService();
const session = authService.getCurrentUser() || '';

class AppRoutes extends Component {
  render() {
    const history = createHistory();

    return (
      <Router history={history}>
      <div>
        <Menu history={history}/>
        <Switch>
            <Route path="/admin" component={AdminPage} />
            <Route path="/currencies/:PrimaryCurrencyCode" component={TradeScreen} />
            <Route path="/currencies" component={FrontPage} />
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Login} />
        </Switch>
        </div>
      </Router>
    );
  }
}

export default AppRoutes;
