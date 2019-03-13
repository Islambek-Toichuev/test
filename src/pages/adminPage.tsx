import React, { Component } from "react";
import styled from "styled-components";
import Loader from "../components/loader/index";
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


    async componentDidMount() {
        console.log('', adminService.getAllUsers());
    }


    render() {

        return  2+2==4 ? (
            <Settings>
                <h1 className="page-title">Admin Settings</h1>
                <div className="trade-screen">

                </div>
            </Settings>
        ) : <Loader/>;
    }
}
