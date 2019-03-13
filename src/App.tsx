import React, { Component } from 'react'
import AppRoutes from "./appRoutes";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="app">
          <AppRoutes />
      </div>
    );
  }
}
