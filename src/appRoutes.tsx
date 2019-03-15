import React, {Component} from "react";
import {Route, Switch, Router} from "react-router-dom";
import Login from "./pages/publicPages/login";
import SignUp from "./pages/publicPages/signUp";
import TradeScreen from "./pages/tradeScreen";
import AdminPage from "./pages/adminPage";
import createHistory from "history/createBrowserHistory";
import Menu from "./components/menu";
import {SessionContext} from "./App";

const FrontPage = React.lazy(() => import('./pages/frontPage'));
const history = createHistory();

class AppRoutes extends Component {
    render() {
        return (
            <SessionContext.Consumer>
                {({session }) => (
                    <Router history={history}>
                        <div>
                            <Menu history={history}/>
                            <React.Suspense fallback={<div/>}>
                                <Switch>
                                    {session && <Route path="/currencies/:PrimaryCurrencyCode" component={TradeScreen}/>}
                                    {session && <Route path="/currencies" render={(props) => <FrontPage {...props} />}/>}
                                    {session && <Route path="/admin" component={AdminPage}/>}
                                    <Route path="/signup" component={SignUp}/>
                                    <Route path="/login" component={Login}/>
                                    <Route path="/" exact component={Login}/>
                                    <Route component={Login} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </Router>
                )}
            </SessionContext.Consumer>
        )
    }
}

export default AppRoutes;
