import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthorizationService from "../../services/authorization";
import Button from '@material-ui/core/Button';
import styled from "styled-components";
import { Redirect,  } from "react-router";

const authService = new AuthorizationService();

const Container = styled.div`
  background: #24292eba;
  position: relative;
  z-index: 10;
  
  .nav button {
      color: white;
      transition: all 300ms;
      background: #24292e;
      border-radius: 0;
  }
  .nav button:hover {
    background: #626669;
  }
  .nav {
    max-width: 80%;
    margin: 0 auto;
    background: #24292e;
  }
`;

interface Props {
  history: any
}

interface State {
}

export default class Menu extends Component<Props, State> {
  logout = () => {
    authService.logOut();
    this.props.history.push('/login');
  };

  render() {
    return (
      <Container>
        <div className="nav">
          <Link to="/admin"><Button color="primary">Admin</Button></Link>
          <Link to="/currencies"><Button color="primary">currencies</Button></Link>
          <Button onClick={(() => this.logout())}   color="primary">Log out</Button>
        </div>
      </Container>
    )
  }
}
