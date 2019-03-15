import "./App.css";
import React, { Component } from 'react'
import AppRoutes from "./appRoutes";
import AuthorizationService from "./services/authorization";

const authService = new AuthorizationService();

export const SessionContext = React.createContext({
    session: authService.getCurrentSession(),
    changeSession: (session:string) => {}
});

export default class App extends Component {

    newSession = (session: string) => this.setState({session: session});

    state = {
        session: authService.getCurrentSession(),
        changeSession: (session: string) => this.newSession(session)
    };

    render() {
    return (
      <div className="app">
          <SessionContext.Provider value={this.state}>
              <AppRoutes />
          </SessionContext.Provider>
      </div>
    );
  }
}
