import { BaseService } from "./baseService";
import { recentTrades } from "./apis";

const base = new BaseService();

export class TradesService {

  constructor() {}
  
  getRecentTrades = (PrimaryCurrencyCode: string) => base.getJson(recentTrades(PrimaryCurrencyCode));

}
