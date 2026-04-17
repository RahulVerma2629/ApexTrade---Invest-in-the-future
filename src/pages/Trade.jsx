import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import Footer from "../components/Footer";

const API_KEY = "d7chsn9r01qv03esdou0d7chsn9r01qv03esdoug";

const STOCKS = [
  { symbol: "AAPL", name: "Apple" },
  { symbol: "MSFT", name: "Microsoft" },
  { symbol: "GOOGL", name: "Google" },
  { symbol: "AMZN", name: "Amazon" },
  { symbol: "TSLA", name: "Tesla" },
  { symbol: "NVDA", name: "NVIDIA" },
  { symbol: "META", name: "Meta" },
  { symbol: "NFLX", name: "Netflix" },
  { symbol: "AMD", name: "AMD" },
  { symbol: "INTC", name: "Intel" },
  { symbol: "JPM", name: "JPMorgan" },
  { symbol: "V", name: "Visa" },
  { symbol: "MA", name: "Mastercard" },
  { symbol: "DIS", name: "Disney" },
  { symbol: "UBER", name: "Uber" },
  { symbol: "KO", name: "Coca-Cola" },
  { symbol: "PEP", name: "PepsiCo" },
  { symbol: "WMT", name: "Walmart" },
  { symbol: "NKE", name: "Nike" },
  { symbol: "BA", name: "Boeing" },
  { symbol: "PYPL", name: "PayPal" },
  { symbol: "ADBE", name: "Adobe" },
  { symbol: "CRM", name: "Salesforce" },
  { symbol: "ORCL", name: "Oracle" },
  { symbol: "CSCO", name: "Cisco" }
];

export default function Trade() {
  const [stocks, setStocks] = useState([]);
  const [qty, setQty] = useState({});
  const [message, setMessage] = useState("");

  const { user, isLoaded } = useUser();
  const email = isLoaded
    ? user?.primaryEmailAddress?.emailAddress
    : null;

  const fetchPrices = async () => {
    const updated = await Promise.all(
      STOCKS.map(async (stock) => {
        try {
          const res = await fetch(
            `https://finnhub.io/api/v1/quote?symbol=${stock.symbol}&token=${API_KEY}`
          );

          const data = await res.json();

          return {
            symbol: stock.symbol,
            name: stock.name,
            price: data.c || 0,
            previous: data.pc || 0,
            change: ((data.c || 0) - (data.pc || 0)).toFixed(2),
          };
        } catch (err) {
          return {
            symbol: stock.symbol,
            name: stock.name,
            price: 0,
            previous: 0,
            change: 0,
          };
        }
      })
    );

    setStocks(updated);
  };

  useEffect(() => {
    fetchPrices();

    const interval = setInterval(fetchPrices, 180000);

    return () => clearInterval(interval);
  }, []);

  const saveTrade = (trade) => {
    const existing = JSON.parse(localStorage.getItem("trades")) || [];
    existing.push(trade);
    localStorage.setItem("trades", JSON.stringify(existing));
  };

  const handleBuy = (stock) => {
    const quantity = qty[stock.symbol] || 1;

    const trade = {
      type: "BUY",
      symbol: stock.symbol,
      qty: quantity,
      price: stock.price,
      total: quantity * stock.price,
      time: new Date().toLocaleString(),
    };

    saveTrade(trade);
    setMessage(`Purchase successful · ${quantity} shares of ${stock.name} added to portfolio`);
  };

  const handleSell = (stock) => {
    const quantity = qty[stock.symbol] || 1;

    const trade = {
      type: "SELL",
      symbol: stock.symbol,
      qty: quantity,
      price: stock.price,
      total: quantity * stock.price,
      time: new Date().toLocaleString(),
    };

    saveTrade(trade);
    setMessage(`Sale completed · ${quantity} shares of ${stock.name} sold`);
  };

  return (
    <>
    <div className="trade-container">
      <h1>Trade Stocks</h1>
      <p>Real-time stock analysis based on your budget, sector and risk profile</p>
      {message && <div className="trade-message">{message}</div>}
      <div className="trade-grid">
        {stocks.map((stock) => (
          <div key={stock.symbol} className="trade-card">
            <div className="trade-top">
            <h3>{stock.symbol}</h3>
            <span className="price">₹{stock.price}</span>
          </div>

          <p className="name">{stock.name}</p>

            <p
              style={{
                color: Number(stock.change) >= 0 ? "#22c55e" : "#ef4444",
                marginBottom: "10px",
              }}
            >
              {Number(stock.change) >= 0 ? "+" : ""}
              {stock.change}
            </p>

            <input
              type="number"
              min="1"
              placeholder="Quantity"
              value={qty[stock.symbol] || ""}
              onChange={(e) =>
                setQty({
                  ...qty,
                  [stock.symbol]: Number(e.target.value),
                })
              }
            />

            <div className="trade-actions">
              <button className="buy" onClick={() => handleBuy(stock)}>
                Buy
              </button>

              <button className="sell" onClick={() => handleSell(stock)}>
                Sell
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer />
  </>
  );
}
