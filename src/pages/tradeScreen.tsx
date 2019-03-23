import React, { Component } from "react";
import styled from "styled-components";
import Loader from "../components/loader/index";
import Table from "../components/table/index";
import TableBuilder from "../helpers/tableBuilder";
import TradesService from "../services/trades";

const tradesService = new TradesService();
const tableBuilder = new TableBuilder();

let Screen = styled.div`
  text-align: center;

  .tradeTable {
    max-width: 80%;
    margin: 0 auto;
  }
  .header {
    margin-bottom: 20px;
  }
`;

interface Props {
  match: any;
}

interface States {
  tradeDetails: any;
}

export default class TradeScreen extends Component<Props, States> {
  constructor(props: any) {
    super(props);

    this.state = {
      tradeDetails: null
    };
  }

  async componentWillMount() {
    const { PrimaryCurrencyCode, SecondaryCurrencyCode } = this.props.match.params;
    this.setState({
      tradeDetails: await tradesService.getRecentTrades(PrimaryCurrencyCode, SecondaryCurrencyCode)
    });
  }

  render() {
    let tradeDetails = this.state.tradeDetails || null;

    return tradeDetails ? (
      <Screen>
        <h1 className="page-title">Trade Screen</h1>
        {!tradeDetails["Message"] ? (
          <div className="trade-screen">
            <div className="header">
              {tradeDetails["PrimaryCurrencyCode"]} to{" "}
              {tradeDetails["SecondaryCurrencyCode"]}
            </div>
            <div className="tradeTable">
              <Table
                tableData={tableBuilder.tradeScreenTable(tradeDetails.Trades)}
              />
            </div>
          </div>
        ) : (
          "404 no such Currency Code"
        )}
      </Screen>
    ) : (
      <Loader />
    );
  }
}
