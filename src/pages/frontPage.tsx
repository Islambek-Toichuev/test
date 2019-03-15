import React, { Component } from "react";
import { TableBuilder } from "../helpers/tableBuilder";
import { CurrencyService } from "../services/currencies";
import { TradesService } from "../services/trades";
import Table from "../components/table/index";
import Loader from "../components/loader/index";

const currencyService = new CurrencyService();
const tradesService = new TradesService();

interface Props {
    history: any
}

export default class FrontPage extends Component<Props> {

  state = {
    tableData: null,
  };

  async componentWillMount() {

    let currencies = await currencyService.getCurrencyCodes;

    let requestImages: any[] = currencies.map(async (currency: string) => await currencyService.getCurrencyImage(currency));
    let requestRecentTrades: any[] = currencies.map(async (currency: string) => await tradesService.getRecentTrades(currency));

    let currencyImages: any[] = await Promise.all(requestImages);
    let recentTrades: any[] = await Promise.all(requestRecentTrades);
    let tableData = new TableBuilder().currencyTable(currencies, recentTrades, currencyImages);

    this.setState({ tableData: tableData })
  };

  showTradeScreen = (row: any) => {
      let PrimaryCurrency = row[1].value.replace(/ /g, '').split('/')[0];
      this.props.history.push(`/currencies/${PrimaryCurrency}`);
  };

  render() {
    const { tableData } = this.state;
    return tableData ? (
      <div className="front-table">
        {tableData && 
          <>
            <h1>Cryptocurrency Table</h1>
            <Table rowClick={(e: any) => this.showTradeScreen(e)} tableData={tableData} />
          </>
        }
      </div>
    ) : (<Loader />);
  }
}
