import React, { Component } from "react";
import AuthorizationService from "../../services/authorization";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import { Validators } from "../../helpers/validators";
import { User } from "../../interfaces/index";
import { set_session } from "../../redux/actions/index";
import { connect } from "react-redux";
import "./style.css";

const validate = new Validators();
const authService = new AuthorizationService();

interface Props {
  history: any;
  dispatch: any;
  session?: User;
  setSession: (user: User) => void;
}

interface State {
  session?: User;
  username?: string;
  email: string;
  password: string;
  redirect: boolean;
  error: { message: string; isError: boolean };
}

class SignUp extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      error: { message: "", isError: false },
      redirect: false
    };
  }

  onChange = (val: string, field: string) => {
    if (field === "email") {
      return validate.email(val)
        ? this.setState({ email: val, error: { message: "", isError: false } })
        : this.setState({
            error: { message: "Please provide valid email", isError: true }
          });
    }
    if (field === "password") {
      this.setState({ password: val });
      return val.length >= 6
        ? this.setState({ error: { message: "", isError: false } })
        : this.setState({
            error: { message: "Min password length is 6", isError: true }
          });
    }
  };

  handleSubmit = () => {
    let { email, password } = this.state;
    let user = { email: email, password: password };
    let register = authService.registerNewUser(user);
    
    if (!register.res)
      return this.setState({
        error: { message: register.text, isError: true }
      });
    this.props.setSession(user);
    this.setState({ redirect: true });
    return this.props.history.push("/currencies");
  };

  render() {
    let { email, password, redirect, error } = this.state;
    let incorrectPassword = password.length <= 5 && error.isError;
    let incorrectEmail = validate.email(email) && error.isError;

    return (
      <div className="container-login">
        <div className="login_form">
          <h2>Sign Up</h2>
          <form>
            <TextField
              label="Username"
              margin="normal"
              className="login_field"
              onChange={e => this.onChange(e.target.value, "username")}
            />
            <TextField
              label="Email"
              margin="normal"
              className="login_field"
              error={incorrectEmail}
              onChange={e => this.onChange(e.target.value, "email")}
            />
            {incorrectEmail && <span className="error">{error.message}</span>}
            <TextField
              label="Password"
              type="password"
              margin="normal"
              className="login_field"
              error={incorrectPassword}
              onChange={e => this.onChange(e.target.value, "password")}
            />
            {incorrectPassword && (
              <span className="error">{error.message}</span>
            )}
            <div className="actions">
              <Button
                onClick={() => this.handleSubmit()}
                variant="contained"
                color="primary"
                disabled={!validate.email(email) || password.length <= 5}
              >
                Sign Up
              </Button>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
            </div>
          </form>
        </div>
        {redirect && <Redirect to="/currencies" />}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return { state };
};

const mapDispatchToProps = (dispatch: any) => ({
  setSession: (user: User) => dispatch(set_session(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
