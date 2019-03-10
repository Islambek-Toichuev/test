import React, { Component } from 'react';
import { TableBuilder } from "../helpers/tableBuilder";
import { CurrencyService } from "../services/currencies";
import { TradesService } from "../services/trades";
import { Redirect } from 'react-router';
import Table from "../components/table/index";
import Loader from "../components/loader/index";
import AuthorizationService from "../services/authorization";
import Button from '@material-ui/core/Button';

const authService = new AuthorizationService();
const currencyService = new CurrencyService();
const tradesService = new TradesService();

export default class FrontPage extends Component {
  state = {
    tableData: null,
    logout: false
  }

  componentDidMount = async () => {

    let currencies = await currencyService.getCurrencyCodes;

    let requestImages: any[] = currencies.map((currency: string) => currencyService.getCurrencyImage(currency));
    let requestRecentTrades: any[] = currencies.map((currency: string) => tradesService.getRecentTrades(currency));

    let currencyImages: any[] = await Promise.all(requestImages);
    let recentTrades: any[] = await Promise.all(requestRecentTrades);
    let tableData = new TableBuilder().currencyTable(currencies, recentTrades, currencyImages);

    this.setState({ tableData: tableData })
  }

  logOut = () => {
    authService.logOut();
    this.setState({ logout: true })
  }

  render() {
    const { tableData } = this.state;
    return tableData ? (
      <div className="front-table">
        {tableData && <h1>Cryptocurrency Table</h1>}
        <Button color="secondary" onClick={() => this.logOut()}>Logout</Button>
        {tableData && <Table tableData={tableData} />}
        {this.state.logout && <Redirect to="/" />}
      </div>
    ) : (<Loader />);
  }
}
