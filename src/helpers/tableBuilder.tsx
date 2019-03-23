import * as React from "react";
import Button from "@material-ui/core/Button";
import AuthorizationService from "../services/authorization";

const authService = new AuthorizationService();

function timeConvert(num: number) {
  let hours = num / 60;
  let rhours = Math.floor(hours);
  let minutes = (hours - rhours) * 60;
  let rminutes = Math.round(minutes);
  return `${rhours > 0 ? rhours + " hour and " : ""}${rminutes} mins ago.`;
}

interface User {
  username?: string;
  email: string;
  password: string;
}

// helper to build tableData for table component
export default class TableBuilder {
  constructor() {}

  currencyTable = (currencies: any, recentTrades: any, currencyImages: any) => {
    return currencies.map((currency: string, index: number) => {
      let { Trades } = recentTrades[index];
      let firstTrade = Trades[0];
      let lastTrade = Trades[Trades.length - 1];
      let firstTradeTime = new Date(firstTrade.TradeTimestampUtc).getMinutes();
      let lastTradeTime = new Date(lastTrade.TradeTimestampUtc).getMinutes();

      // shorten
      let sctp = "SecondaryCurrencyTradePrice";
      let pca = "PrimaryCurrencyAmount";

      let SCTPs = Trades.map((trade: any) => trade[sctp]);
      let totalSCTPbyPCA = 0;
      let totalPCA = 0;

      Trades.forEach((tr: any) => (totalSCTPbyPCA += tr[sctp]));
      Trades.forEach((tr: any) => (totalPCA += tr[pca]));

      let vvwap = totalSCTPbyPCA / totalPCA;
      let firstSCTP = SCTPs[0];
      let lastSCTP = SCTPs[SCTPs.length - 1];
      let sortedSCTPs = SCTPs.sort((a: any, b: any) => a - b);
      let changedValue = (((lastSCTP - firstSCTP) / lastSCTP) * 100).toFixed(2);

      return [
        {
          title: "Icon",
          value: <img src={currencyImages[index]} />
        },
        {
          title: "Currency Pair",
          value: currency + " / AUD"
        },
        {
          title: "Last Price",
          value: lastSCTP
        },
        {
          title: "Low",
          value: sortedSCTPs[0]
        },
        {
          title: "High",
          value: sortedSCTPs[sortedSCTPs.length - 1]
        },
        {
          title: "LWAP",
          value: vvwap.toFixed(2)
        },
        {
          title: "Last Trade",
          value: timeConvert(lastTradeTime - new Date().getMinutes())
        },
        {
          title: "Change",
          value: (
            <>
              <span className={changedValue.includes("-") ? "red" : "green"}>
                {changedValue}% &nbsp;
              </span>
              {timeConvert(lastTradeTime - firstTradeTime)}
            </>
          )
        }
      ];
    });
  };

  tradeScreenTable = (trades: any) => {
    return trades.map((trade: any) => {
      return [
        {
          title: "Trade Time",
          value: new Date(trade["TradeTimestampUtc"]).toLocaleDateString()
        },
        {
          title: "Primary Currency Amount",
          value: trade["PrimaryCurrencyAmount"].toFixed(2)
        },
        {
          title: "Secondary Currency Trade Price",
          value: trade["SecondaryCurrencyTradePrice"].toFixed(2)
        }
      ];
    });
  };

  adminUsers = (users: User[], deleteHandler: any) => {
    return users.map((user: User) => {
      return [
        {
          title: "Username",
          value: user.username
        },
        {
          title: "Password",
          value: user.password
        },
        {
          title: "Email",
          value: user.email
        },
        {
          title: "Actions",
          value: (
            <div>
              <Button
                variant="contained"
                color="secondary"
                disabled={
                  user.email === 'change'
                }
                onClick={() => deleteHandler(user)}
              >
                Delete
              </Button>
            </div>
          )
        }
      ];
    });
  };
}
