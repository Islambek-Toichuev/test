import React, {Component} from 'react'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
import {Validators} from "../../helpers/validators";
import AuthorizationService from "../../services/authorization";
import { SessionContext } from "../../App";
import "./style.css";

const validate = new Validators();
const authService = new AuthorizationService();

interface Props {
    history: any,
}

export default class Login extends Component<Props> {
    state = {
        email: '',
        password: '',
        error: false,
    };

    onChange = (val: string, field: string) => {
        if (field === 'email') {
            return validate.email(val) ?
                this.setState({email: val, error: false}) :
                this.setState({error: true});
        }
        if (field === 'password') {
            this.setState({password: val});
            return val.length >= 6 ?
                this.setState({error: false}) :
                this.setState({error: true});
        }
    };

    logIn = (changeSession: any) => {
        let {email, password} = this.state;

        let authorize = authService.logIn({email: email, password: password});
        if (!authorize.res) return this.setState({error: true});
        changeSession(`{email: ${email}, password: ${password},}`);
        return  this.props.history.push('/currencies');
    };

    render() {
        let {
            email,
            password,
            error,
        } = this.state;

        return (
            <SessionContext.Consumer>
                {({session, changeSession}) => (
                    <div className="container-login">
                        <div className="login_form">
                            <h2>Login</h2>
                            <form>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    className="login_field"
                                    error={error}
                                    onChange={(e) => this.onChange(e.target.value, 'email')}
                                />
                                {!validate.email(email) && <span className="error">Please provide valid email</span>}
                                <TextField
                                    label="Password"
                                    type="password"
                                    margin="normal"
                                    className="login_field"
                                    error={error}
                                    onChange={(e) => this.onChange(e.target.value, 'password')}
                                />
                                {password.length <= 5 && <span className="error">Min password length is 6</span>}
                                <div className="actions">
                                    <Button
                                        onClick={() => this.logIn(changeSession)}
                                        variant="contained"
                                        color="primary"
                                        disabled={(!validate.email(email) || password.length <= 5)}
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
                    </div>
                )}
            </SessionContext.Consumer>
        )
    }
}
