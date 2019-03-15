import React, { Component } from "react";
import styled from "styled-components";
import AdminService from "../services/admin";

let adminService = new AdminService();

let Settings = styled.div`
  text-align: center;
  
  .tradeTable {
    max-width: 80%;
    margin: 0 auto;
  }
  .header { margin-bottom: 20px }
`;


export default class AdminPage extends Component {

    state = {
        users: [],
    };

    async componentWillMount() {
        this.setState({
            users: adminService.getAllUsers()
        })
    };


    render() {
        let { users } = this.state;
        console.log(users);
        return (
            <Settings>
                <h1 className="page-title">Admin Settings</h1>
                <div className="admin-page">{}</div>
            </Settings>
        )
    }
}
