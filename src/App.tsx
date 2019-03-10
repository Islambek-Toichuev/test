import React, { Component } from 'react'
import { Router } from "react-router";
import AppRoutes from "./appRoutes";
import createHistory from "history/createBrowserHistory";
import "./App.css";

export default class App extends Component {
  render() {
    const history = createHistory();

    return (
      <div className="app">
        <Router history={history}>
          <AppRoutes />
        </Router>
      </div>
    );
  }
}
