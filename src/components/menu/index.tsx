import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { clear_session } from "../../redux/actions/index";
import { connect } from "react-redux";
import { User } from "../../interfaces/index";

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
  history: any;
  session?: User;
  clearSession: () => void;
}

interface State {
  session?: User;
}

class Menu extends Component<Props, State> {
  logout = () => {
    this.props.clearSession();
    this.props.history.push("/login");
  };

  render() {
    let { session } = this.props;
    return session!.email ? (
      <Container>
        <div className="nav">
          <Link to="/admin">
            <Button color="primary">Admin</Button>
          </Link>
          <Link to="/currencies">
            <Button color="primary">currencies</Button>
          </Link>
          <Button
            onClick={() => this.logout()}
            color="primary"
          >
            Log out
          </Button>
        </div>
      </Container>
    ) : null;
  }
}

const mapStateToProps = (state: State) => {
  return { session: state.session };
};

const mapDispatchToProps = (dispatch: any) => ({
  clearSession: () => dispatch(clear_session())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);
