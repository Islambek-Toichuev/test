import React, { Component } from "react";
import styled from "styled-components";
import AdminService from "../services/admin";
import TableBuilder from "../helpers/tableBuilder";
import Table from "../components/table/index";
import PopUp from "../components/popUp";
import Button from "@material-ui/core/Button";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { User } from "../interfaces/index";

const adminService = new AdminService();

let Settings = styled.div`
  max-width: 80%;
  margin: 0 auto;
  text-align: center;

  h2 {
    text-align: left;
  }
  .user {
    margin-bottom: 30px;
    font-size: 18px;
  }
`;

let tableBuilder = new TableBuilder();

interface State {
  selectedUser: any;
  users: any;
}

interface Props {
  selectedUser: any;
  users: any;
  session?: any;
}

class AdminPage extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      users: tableBuilder.adminUsers(
        adminService.getAllUsers(),
        this.deleteHandler,
        this.props.session.email
      ),
      selectedUser: null
    };
  }

  deleteHandler = (user: User) => this.setState({ selectedUser: user });

  closePopup = () => this.setState({ selectedUser: null });

  deleteUser = () => {
    adminService.deleteUser(this.state.selectedUser.email);
    this.setState({
      users: tableBuilder.adminUsers(
        adminService.getAllUsers(),
        this.deleteHandler,
        this.props.session.email
      ),
      selectedUser: null
    });
  };

  render() {
    let { users, selectedUser } = this.state;

    return (
      <Settings>
        <h1 className="page-title">Admin Settings</h1>
        <div className="admin-page">
          <h2>Manage users</h2>
          <div className="users">
            <Table tableData={users} />
          </div>
        </div>
        {selectedUser && (
          <PopUp onClose={() => this.closePopup()} title="Delete user?">
            <div>
              <div className="user">With email: {selectedUser.email}</div>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => this.deleteUser()}
                style={{ marginRight: 10 }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.closePopup()}
              >
                Cancel
              </Button>
            </div>
          </PopUp>
        )}
      </Settings>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { session: state.session };
};

export default connect(mapStateToProps)(AdminPage);
