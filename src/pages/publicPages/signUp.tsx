import React, { Component } from 'react'
import AuthorizationService from "../../services/authorization";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import './style.css';

const authService = new AuthorizationService();

export default class SignUp extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    redirect: false
  };

  onChange = (val: string, field: string) => {
    this.setState({ [field]: val, error: false })
  };

  signUp = () => {
    authService.registerNewUser(this.state);
    this.setState({ redirect: true })
  }

  render() {
    return (
      <div className="container-login">
        <div className="login_form">
          <h2>Sign Up</h2>
          <form>
            <TextField
              label="Username"
              margin="normal"
              className="login_field"
              onChange={(e) => this.onChange(e.target.value, 'username')}
            />
            <TextField
              required
              label="Email"
              margin="normal"
              className="login_field"
              onChange={(e) => this.onChange(e.target.value, 'email')}
            />
            <TextField
              required
              label="Password"
              type="password"
              margin="normal"
              className="login_field"
              onChange={(e) => this.onChange(e.target.value, 'password')}
            />
            <div className="actions">
              <Button
                onClick={() => this.signUp()}
                variant="contained"
                color="primary"
              >
                Sign Up
              </Button>
              <Link to="/login">
                <Button>
                  Login
                </Button>
              </Link>
            </div>
          </form>
        </div>
        {this.state.redirect && <Redirect to="/currencies" />}
      </div>
    )
  }
}
