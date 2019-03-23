import React, { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import Login from "./pages/publicPages/login";
import SignUp from "./pages/publicPages/signUp";
import TradeScreen from "./pages/tradeScreen";
import AdminPage from "./pages/adminPage";
import createHistory from "history/createBrowserHistory";
import Menu from "./components/menu";
import { connect } from "react-redux";
import { User } from "./interfaces/index";

const FrontPage = React.lazy(() => import("./pages/frontPage"));
const history = createHistory();

interface Props {
  session?: User;
}

interface State {
  session?: User;
}

class AppRoutes extends Component<Props> {
  render() {
    let { session } = this.props;
    
    return (
      <Router history={history}>
        <div>
          <Menu history={history} />
          <React.Suspense fallback={<div />}>
            <Switch>
              {session && (
                <Route
                  path="/currencies/:PrimaryCurrencyCode"
                  component={TradeScreen}
                />
              )}
              {session && (
                <Route
                  path="/currencies"
                  render={props => <FrontPage {...props} />}
                />
              )}
              {session && <Route path="/admin" component={AdminPage} />}
              <Route path="/signup" component={SignUp} />
              <Route path="/login" component={Login} />
              <Route path="/" exact component={Login} />
              <Route component={Login} />
            </Switch>
          </React.Suspense>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state: State) => {
  return { session: state.session };
};

export default connect(mapStateToProps)(AppRoutes);
