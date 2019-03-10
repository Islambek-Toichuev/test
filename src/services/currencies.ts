import { BaseService } from "./baseService";
import { currencyCodes } from "./apis";
import { currencyImages } from "./apis";

const base = new BaseService();

export class CurrencyService {
  constructor() {}
  
  getCurrencyCodes = base.getJson(currencyCodes);
  getCurrencyImage = (PrimaryCurrencyCode: string) => base.getRequest(currencyImages(PrimaryCurrencyCode));
}