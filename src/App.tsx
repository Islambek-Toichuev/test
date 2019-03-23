import "./App.css";
import React, { Component } from "react";
import AppRoutes from "./appRoutes";

export default class App extends Component {
  render() {
    return (
      <div className="app">
          <AppRoutes />
      </div>
    );
  }
}
