import React, { Component } from 'react'
import AuthorizationService from "../../services/authorization";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {Validators} from "../../helpers/validators";
import './style.css';

const authService = new AuthorizationService();
const validate = new Validators();

export default class SignUp extends Component {

  state = {
    username: '',
    email: '',
    password: '',
    redirect: false,
  };

  onChange = (val: string, field: string) => this.setState({[field]: val});

  signUp = () => {
    let { password, email } = this.state;
    authService.registerNewUser({password: password, email: email});
    this.setState({ redirect: true })
  };

  render() {
      let {
          email,
          password,
          redirect
      } = this.state;

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
              {!validate.email(email) && <span className="error">Please provide valid email</span>}
            <TextField
              required
              label="Password"
              type="password"
              margin="normal"
              className="login_field"
              onChange={(e) => this.onChange(e.target.value, 'password')}
            />
              {password.length <= 5 && <span className="error">Min password length is 6</span>}
            <div className="actions">
              <Button
                onClick={() => this.signUp()}
                variant="contained"
                color="primary"
                disabled={(!validate.email(email) || password.length <= 5)}
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
        {redirect && <Redirect to="/currencies" />}
      </div>
    )
  }
}
