import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import AuthorizationService from "./services/authorization";
import Login from "./pages/publicPages/login";
import SignUp from "./pages/publicPages/signUp";
import FrontPage from "./pages/frontPage";
import TradeScreen from "./pages/tradeScreen";
import AdminPage from "./pages/adminPage";

const authService = new AuthorizationService();
const session = authService.getCurrentUser() || '';

class AppRoutes extends Component {
  render() {
    return (
      <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route path="/currencies/:PrimaryCurrencyCode" component={TradeScreen} />
          <Route path="/currencies" component={FrontPage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <Route path="/" exact component={Login} />
      </Switch>
    );
  }
}

export default AppRoutes;
