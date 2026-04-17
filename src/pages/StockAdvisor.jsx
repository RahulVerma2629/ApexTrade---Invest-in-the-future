import React, { useEffect, useState } from "react";

const API_KEY = "d7chsn9r01qv03esdou0d7chsn9r01qv03esdoug";

const STOCKS = [
  { symbol: "AAPL", name: "Apple", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft", sector: "Technology" },
  { symbol: "GOOGL", name: "Google", sector: "Technology" },
  { symbol: "NVDA", name: "NVIDIA", sector: "Technology" },
  { symbol: "AMD", name: "AMD", sector: "Technology" },
  { symbol: "INTC", name: "Intel", sector: "Technology" },
  { symbol: "ADBE", name: "Adobe", sector: "Technology" },
  { symbol: "CRM", name: "Salesforce", sector: "Technology" },
  { symbol: "ORCL", name: "Oracle", sector: "Technology" },
  { symbol: "CSCO", name: "Cisco", sector: "Technology" },
  { symbol: "AMZN", name: "Amazon", sector: "Consumer Discretionary" },
  { symbol: "TSLA", name: "Tesla", sector: "Consumer Discretionary" },
  { symbol: "NKE", name: "Nike", sector: "Consumer Discretionary" },
  { symbol: "DIS", name: "Disney", sector: "Communication Services" },
  { symbol: "META", name: "Meta", sector: "Communication Services" },
  { symbol: "NFLX", name: "Netflix", sector: "Communication Services" },
  { symbol: "UBER", name: "Uber", sector: "Transportation" },
  { symbol: "JPM", name: "JPMorgan", sector: "Financial Services" },
  { symbol: "V", name: "Visa", sector: "Financial Services" },
  { symbol: "MA", name: "Mastercard", sector: "Financial Services" },
  { symbol: "PYPL", name: "PayPal", sector: "Financial Services" },
  { symbol: "KO", name: "Coca-Cola", sector: "Consumer Staples" },
  { symbol: "PEP", name: "PepsiCo", sector: "Consumer Staples" },
  { symbol: "WMT", name: "Walmart", sector: "Consumer Staples" },
  { symbol: "BA", name: "Boeing", sector: "Industrials" }
];

export default function StockAdvisor() {
  const [budget, setBudget] = useState("");
  const [risk, setRisk] = useState("Medium");
  const [sector, setSector] = useState("All");
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    if (!budget) return;

    setLoading(true);

    const results = await Promise.all(
      STOCKS.map(async (stock) => {
        try {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`
          );

          const data = await res.json();

          const price = data.c || 0;
          const prev = data.pc || 0;

          const change =
            prev > 0 ? (((price - prev) / prev) * 100).toFixed(2) : 0;

          let action = "HOLD";
          let reason = "Stable stock, monitor market movement.";
          let color = "#facc15";

          if (risk === "High") {
            if (change > 1) {
              action = "BUY";
              reason = "Strong momentum suits high-risk investing.";
              color = "#22c55e";
            }
          }

          if (risk === "Medium") {
            if (change > 0.5 && price < budget * 0.3) {
              action = "BUY";
              reason = "Balanced opportunity with reasonable price.";
              color = "#22c55e";
            }
          }

          if (risk === "Low") {
            if (change < 0) {
              action = "WATCH";
              reason = "Price is weak, safer to wait.";
              color = "#ef4444";
            }
          }

          return {
            ...stock,
            price,
            change,
            action,
            reason,
            color,
            suggestedQty: Math.floor(budget / price),
          };
        } catch {
          return null;
        }
      })
    );

    const filtered = results
      .filter(Boolean)
      .filter(
        (stock) => sector === "All" || stock.sector === sector
      );

    setStocks(filtered);
    setLoading(false);
  };

  useEffect(() => {
    if (budget) {
      fetchAdvice();
    }
  }, [risk, sector]);

  const sectors = ["All", ...new Set(STOCKS.map((s) => s.sector))];

  return (
    <div className="advisor-container">
      <div className="advisor-header">
        <h1>Smart Stock Advisor</h1>
        <p>
          Real-time stock analysis based on your budget, sector and risk profile
        </p>
      </div>

      <div className="advisor-panel">
        <div className="input-group">
          <label>Budget (₹)</label>
          <input
            type="number"
            placeholder="Enter amount"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
          />
        </div>

        <div className="input-group">
          <label>Risk Level</label>
          <select value={risk} onChange={(e) => setRisk(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="input-group">
          <label>Sector</label>
          <select value={sector} onChange={(e) => setSector(e.target.value)}>
            {sectors.map((sec) => (
              <option key={sec}>{sec}</option>
            ))}
          </select>
        </div>

        <button className="advisor-btn" onClick={fetchAdvice}>
          Analyze
        </button>
      </div>

      {loading ? (
        <div className="advisor-loading">Analyzing live market data...</div>
      ) : (
        <div className="advisor-grid">
          {stocks.map((s) => (
            <div className="stock-card" key={s.symbol}>
              <div className="stock-header">
                <div>
                  <h3>{s.symbol}</h3>
                  <p className="stock-name">{s.name}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div className="stock-price">₹{s.price.toFixed(2)}</div>

                  <div
                    style={{
                      color:
                        Number(s.change) >= 0 ? "#22c55e" : "#ef4444",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {Number(s.change) >= 0 ? "+" : ""}
                    {s.change}%
                  </div>
                </div>
              </div>

              <p className="stock-sector">{s.sector}</p>

              <div
                className="stock-action"
                style={{
                  background: s.color,
                  color: "white",
                }}
              >
                {s.action}
              </div>

              <p className="stock-reason">{s.reason}</p>

              <div className="stock-footer">
                Suggested Qty: {s.suggestedQty}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}