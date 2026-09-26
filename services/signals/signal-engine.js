import {
  ema,
  rsi,
  bollingerBands,
  volatility
} from "../../packages/indicators/technical.js";


export function analyzeTechnical(
  candles
) {

  const closes =
    candles.map(
      candle => candle.close
    );

  const current =
    closes.at(-1);

  const ema20 =
    ema(closes, 20);

  const ema50 =
    ema(closes, 50);

  const rsi14 =
    rsi(closes, 14);

  const bands =
    bollingerBands(
      closes,
      20,
      2
    );

  const vol =
    volatility(
      closes,
      20
    );


  let score = 50;


  /*
   * TREND
   */

  if (
    ema20 !== null &&
    ema50 !== null
  ) {

    if (
      current > ema20 &&
      ema20 > ema50
    ) {
      score += 20;
    }

    if (
      current < ema20 &&
      ema20 < ema50
    ) {
      score -= 20;
    }
  }


  /*
   * MOMENTUM
   */

  if (rsi14 !== null) {

    if (
      rsi14 >= 50 &&
      rsi14 < 70
    ) {
      score += 12;
    }

    if (
      rsi14 < 40
    ) {
      score -= 8;
    }

    if (
      rsi14 >= 70
    ) {
      score -= 5;
    }
  }


  /*
   * BOLLINGER POSITION
   */

  if (bands) {

    if (
      current > bands.middle
    ) {
      score += 5;
    }

    if (
      current < bands.lower
    ) {
      score += 3;
    }
  }


  score =
    Math.max(
      0,
      Math.min(
        100,
        Math.round(score)
      )
    );


  let signal = "NEUTRAL";


  if (score >= 70) {
    signal = "BULLISH";
  } else if (score <= 30) {
    signal = "BEARISH";
  }


  return {

    score,

    signal,

    indicators: {

      price: current,

      ema20,

      ema50,

      rsi14,

      bollinger: bands,

      volatility: vol

    },

    generatedAt:
      new Date().toISOString()

  };
}
