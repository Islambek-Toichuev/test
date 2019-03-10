import React, { Component } from 'react'
import AuthorizationService from "../../services/authorization";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import "./style.css";

const authService = new AuthorizationService();

export default class Login extends Component {
  state = {
    email: '',
    password: '',
    error: false,
    loggedIn: false
  };

  onChange = (val: string, field: string) => {
    this.setState({ [field]: val, error: false })
  };

  logIn = () => {
    let clbk = authService.logIn(this.state);
    if (typeof clbk === "object") return this.setState({ error: true })
    return this.setState({ loggedIn: true })
  };

  render() {
    return (
      <div className="container-login">
        <div className="login_form">
          <h2>Login</h2>
          <form>
            <TextField
              label="Email"
              margin="normal"
              className="login_field"
              error={this.state.error}
              onChange={(e) => this.onChange(e.target.value, 'email')}
            />
            <TextField
              label="Password"
              type="password"
              margin="normal"
              className="login_field"
              error={this.state.error}
              onChange={(e) => this.onChange(e.target.value, 'password')}
            />
            <div className="actions">
              <Button
                onClick={() => this.logIn()}
                variant="contained"
                color="primary"
              >
                Login
              </Button>
              <Link to="/signup">
                <Button>
                  Sign Up
                </Button>
              </Link>
            </div>
          </form>
        </div>
        {this.state.loggedIn && <Redirect to="/currencies" />}
      </div>
    )
  }
}