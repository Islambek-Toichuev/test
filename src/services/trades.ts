import { BaseService } from "./baseService";
import { recentTrades } from "./apis";

const base = new BaseService();

export default class TradesService {
  constructor() {}

  getRecentTrades = (PrimaryCurrencyCode: string, secondaryCurrencyCode = 'aud') =>
    base.getJson(recentTrades(PrimaryCurrencyCode, secondaryCurrencyCode.toLowerCase()));
}
