import React, { Component } from "react";
import TableBuilder from "../../helpers/tableBuilder";
import CurrencyService from "../../services/currencies";
import TradesService from "../../services/trades";
import Table from "../../components/table/index";
import Loader from "../../components/loader/index";
import "./style.css";
const currencyService = new CurrencyService();
const tradesService = new TradesService();

interface Props {
  history: any;
}

export default class FrontPage extends Component<Props> {
  _isMounted: boolean;

  constructor(props: any) {
    super(props);
    this._isMounted = false;
  }

  state = {
    tableData: null,
    selectedCurrency: "AUD"
  };

  componentDidMount = () => {
    this._isMounted = true;
  };

  getRecentTrades = async () => {
    let currencies = await currencyService.getCurrencyCodes;

    let requestImages: any[] = currencies.map(
      async (currency: string) =>
        await currencyService.getCurrencyImage(currency)
    );
    let requestRecentTrades: any[] = currencies.map(
      async (currency: string) =>
        await tradesService.getRecentTrades(
          currency,
          this.state.selectedCurrency
        )
    );

    let currencyImages: any[] = await Promise.all(requestImages);
    let recentTrades: any[] = await Promise.all(requestRecentTrades);
    let tableData = new TableBuilder().currencyTable(
      currencies,
      recentTrades,
      currencyImages,
      this.state.selectedCurrency
    );

    this._isMounted && this.setState({ tableData: tableData });
  };

  async componentWillMount() {
    this.getRecentTrades();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  showTradeScreen = (row: any) => {
    let PrimaryCurrency = row[1].value.replace(/ /g, "").split("/")[0];
    let SecondaryCurrency = this.state.selectedCurrency;
    this.props.history.push(`/currencies/${PrimaryCurrency}/to/${SecondaryCurrency}`);
  };

  changeCurrency = (currency: string) => {
    this.setState({ selectedCurrency: currency });
    this.getRecentTrades();
  };

  render() {
    const { tableData, selectedCurrency } = this.state;

    return (
      <div className="front-table">
        {tableData ? (
          <>
            <h1>Cryptocurrency Table</h1>
            <h3>Select Your Currency</h3>
            <div className="filter_currencies">
              <div
                onClick={() => this.changeCurrency("AUD")}
                className={selectedCurrency === "AUD" ? "active" : ""}
              >
                <div className="flag_ic aud" /> AUD
              </div>
              <div
                onClick={() => this.changeCurrency("USD")}
                className={selectedCurrency === "USD" ? "active" : ""}
              >
                <div className="flag_ic usd" /> USD
              </div>
              <div
                onClick={() => this.changeCurrency("NZD")}
                className={selectedCurrency === "NZD" ? "active" : ""}
              >
                <div className="flag_ic nzd" /> NZD
              </div>
            </div>
            <Table
              rowClick={(e: any) => this.showTradeScreen(e)}
              tableData={tableData}
            />
          </>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}
