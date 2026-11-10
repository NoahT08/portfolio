
export default async (req) => {
  const symbol = new URL(req.url).searchParams.get("symbol");

  if (!symbol) {
    return new Response("Symbol fehlt", { status: 400 });
  }

  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=1d&interval=1d`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const price = data.chart.result[0].meta.regularMarketPrice;

    return new Response(JSON.stringify({ price }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch {
    return new Response("Kurs konnte nicht geladen werden", { status: 500 });
  }
};
