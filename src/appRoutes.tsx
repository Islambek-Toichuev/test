import React, {Component} from "react";
import {Route, Switch, Router } from "react-router-dom";
import Login from "./pages/publicPages/login";
import SignUp from "./pages/publicPages/signUp";
import TradeScreen from "./pages/tradeScreen";
import AdminPage from "./pages/adminPage";
import createHistory from "history/createBrowserHistory";
import Menu from "./components/menu";

const FrontPage = React.lazy(() => import('./pages/frontPage'));
const history = createHistory();
class AppRoutes extends Component {
    render() {
        return (
                <Router history={history}>
                    <div>
                        <Menu history={history}/>
                        <React.Suspense fallback={<div/>}>
                            <Switch>
                                <Route path="/currencies/:PrimaryCurrencyCode" component={TradeScreen}/>
                                <Route path="/currencies" render={(props) => <FrontPage {...props} />}/>
                                <Route path="/admin" component={AdminPage} />
                                <Route path="/signup" component={SignUp}/>
                                <Route path="/login" component={Login}/>
                                <Route path="/" exact component={Login}/>
                            </Switch>
                        </React.Suspense>
                    </div>
                </Router>
        );
    }
}

export default AppRoutes;
