import React, { Component } from "react";
import { Route } from "react-router-dom";
import AuthorizationService from "./services/authorization";
import Login from "./pages/publicPages/login";
import SignUp from "./pages/publicPages/signUp";
import FrontPage from "./pages/frontPage";

const authService = new AuthorizationService();
const session = authService.getCurrentUser() || '';

class AppRoutes extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        {session.length > 0 && <Route path="/currencies" component={FrontPage} />}
      </div>
    );
  }
}

export default AppRoutes;