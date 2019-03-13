import React, { Component } from "react";
import { TableBuilder } from "../helpers/tableBuilder";
import { CurrencyService } from "../services/currencies";
import { TradesService } from "../services/trades";
import { Redirect,  } from "react-router";
import { Link } from "react-router-dom";
import Table from "../components/table/index";
import Loader from "../components/loader/index";
import AuthorizationService from "../services/authorization";
import Button from '@material-ui/core/Button';

const authService = new AuthorizationService();
const currencyService = new CurrencyService();
const tradesService = new TradesService();

interface Props {
    history: any
}

export default class FrontPage extends Component<Props> {
  state = {
    tableData: null,
    logout: false
  };

  async componentWillMount() {

    let currencies = await currencyService.getCurrencyCodes;

    let requestImages: any[] = currencies.map((currency: string) => currencyService.getCurrencyImage(currency));
    let requestRecentTrades: any[] = currencies.map((currency: string) => tradesService.getRecentTrades(currency));

    let currencyImages: any[] = await Promise.all(requestImages);
    let recentTrades: any[] = await Promise.all(requestRecentTrades);
    let tableData = new TableBuilder().currencyTable(currencies, recentTrades, currencyImages);

    this.setState({ tableData: tableData })
  };

  showTradeScreen = (row: any) => {
      let PrimaryCurrency = row[1].value.replace(/ /g, '').split('/')[0];
      this.props.history.push(`/currencies/${PrimaryCurrency}`);
      console.log('', row);
  };

  logOut = () => {
    authService.logOut();
    this.setState({ logout: true })
  };

  render() {
    const { tableData } = this.state;
    console.log(tableData)
    return tableData ? (
      <div className="front-table">
        {tableData && <h1>Cryptocurrency Table</h1>}
        <Button color="secondary" onClick={() => this.logOut()}>Logout</Button>
          <Link to="/admin"><Button color="secondary">Admin</Button></Link>
        {tableData && <Table rowClick={(e: any) => this.showTradeScreen(e)} tableData={tableData} />}
        {this.state.logout && <Redirect to="/" />}
      </div>
    ) : (<Loader />);
  }
}
