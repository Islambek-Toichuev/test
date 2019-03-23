import { BaseService } from "./baseService";
import { recentTrades } from "./apis";

const base = new BaseService();

export default class TradesService {
  constructor() {}

  getRecentTrades = (PrimaryCurrencyCode: string) =>
    base.getJson(recentTrades(PrimaryCurrencyCode));
}
