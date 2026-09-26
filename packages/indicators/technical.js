export function sma(values, period) {
  if (!values || values.length < period) {
    return null;
  }

  const slice = values.slice(-period);

  return (
    slice.reduce(
      (sum, value) => sum + value,
      0
    ) / period
  );
}


export function ema(values, period) {
  if (!values || values.length < period) {
    return null;
  }

  const multiplier = 2 / (period + 1);

  let result = sma(values.slice(0, period), period);

  for (
    let i = period;
    i < values.length;
    i++
  ) {
    result =
      (values[i] - result) *
        multiplier +
      result;
  }

  return result;
}


export function rsi(values, period = 14) {

  if (!values || values.length <= period) {
    return null;
  }

  let gains = 0;
  let losses = 0;

  for (let i = 1; i <= period; i++) {

    const difference =
      values[i] - values[i - 1];

    if (difference >= 0) {
      gains += difference;
    } else {
      losses += Math.abs(difference);
    }
  }

  let averageGain = gains / period;
  let averageLoss = losses / period;

  for (
    let i = period + 1;
    i < values.length;
    i++
  ) {

    const difference =
      values[i] - values[i - 1];

    const gain =
      difference > 0
        ? difference
        : 0;

    const loss =
      difference < 0
        ? Math.abs(difference)
        : 0;

    averageGain =
      (averageGain * (period - 1) + gain) /
      period;

    averageLoss =
      (averageLoss * (period - 1) + loss) /
      period;
  }

  if (averageLoss === 0) {
    return 100;
  }

  const relativeStrength =
    averageGain / averageLoss;

  return (
    100 -
    100 / (1 + relativeStrength)
  );
}


export function bollingerBands(
  values,
  period = 20,
  deviation = 2
) {

  if (values.length < period) {
    return null;
  }

  const mean = sma(values, period);

  const slice =
    values.slice(-period);

  const variance =
    slice.reduce(
      (sum, value) =>
        sum +
        Math.pow(
          value - mean,
          2
        ),
      0
    ) / period;

  const standardDeviation =
    Math.sqrt(variance);

  return {
    middle: mean,

    upper:
      mean +
      deviation * standardDeviation,

    lower:
      mean -
      deviation * standardDeviation
  };
}


export function volatility(
  values,
  period = 20
) {

  if (values.length < period) {
    return null;
  }

  const returns = [];

  for (
    let i = values.length - period + 1;
    i < values.length;
    i++
  ) {

    const previous =
      values[i - 1];

    const current =
      values[i];

    returns.push(
      (current - previous) /
        previous
    );
  }

  const mean =
    returns.reduce(
      (sum, value) => sum + value,
      0
    ) / returns.length;

  const variance =
    returns.reduce(
      (sum, value) =>
        sum +
        Math.pow(
          value - mean,
          2
        ),
      0
    ) / returns.length;

  return Math.sqrt(variance);
}
