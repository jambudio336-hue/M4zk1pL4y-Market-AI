export function buildAnalysisPrompt({
  asset,
  technical,
  fundamental = {},
  macro = {}
}) {

  return `
You are the analysis layer of M4zk1pL4y Market AI.

Your task is to explain market conditions
using ONLY the supplied structured data.

ASSET
${JSON.stringify(asset, null, 2)}

TECHNICAL
${JSON.stringify(technical, null, 2)}

FUNDAMENTAL
${JSON.stringify(fundamental, null, 2)}

MACRO
${JSON.stringify(macro, null, 2)}

Return:

1. Market regime
2. Technical interpretation
3. Fundamental interpretation
4. Macro impact
5. Bullish scenario
6. Bearish scenario
7. Main invalidation condition
8. Key risks

Do not claim certainty.
Do not invent unavailable data.
Do not present a forecast as guaranteed.
Clearly distinguish supplied data from inference.
`;
}


export async function analyzeAsset(
  provider,
  context
) {

  const prompt =
    buildAnalysisPrompt(context);

  return provider.generate({
    prompt
  });

}
