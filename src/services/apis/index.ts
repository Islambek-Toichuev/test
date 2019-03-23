const ignoreCORS = "https://cors-anywhere.herokuapp.com/";
const inds = "https://www.independentreserve.com/";
const indsAPI = "https://api.independentreserve.com/";

// currency codes api
export const currencyCodes = `${ignoreCORS}https://api.independentreserve.com/Public/GetValidPrimaryCurrencyCodes`;

// currency images api
export const currencyImages = (primaryCurrencyCode: string) =>
  `${ignoreCORS}${inds}img/flags/${primaryCurrencyCode}32.png`;

// currency trades api
export const recentTrades = (primaryCurrencyCode: string, secondaryCurrencyCode: string) =>
  `${ignoreCORS}${indsAPI}Public/GetRecentTrades?primaryCurrencyCode=${primaryCurrencyCode}&secondaryCurrencyCode=${secondaryCurrencyCode}&numberOfRecentTradesToRetrieve=50`;
