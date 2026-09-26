export const ASSET_TYPES = {
  STOCK: "stock",
  CRYPTO: "crypto",
  FOREX: "forex",
  COMMODITY: "commodity",
  INDEX: "index",
  ETF: "etf",
  TOKEN: "token"
};


export function createAsset({
  symbol,
  name,
  type,
  exchange = null
}) {
  return {
    symbol,
    name,
    type,
    exchange
  };
}


export function createQuote({
  symbol,
  price,
  change24h,
  volume = null,
  marketCap = null,
  timestamp = Date.now()
}) {
  return {
    symbol,
    price,
    change24h,
    volume,
    marketCap,
    timestamp
  };
}
