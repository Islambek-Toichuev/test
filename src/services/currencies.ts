import { BaseService } from "./baseService";
import { currencyCodes } from "./apis";
import { currencyImages } from "./apis";

const base = new BaseService();

export default class CurrencyService {
  constructor() {}

  getCurrencyCodes = base.getJson(currencyCodes);
  getCurrencyImage = (PrimaryCurrencyCode: string) =>
    base.getRequest(currencyImages(PrimaryCurrencyCode));
}
