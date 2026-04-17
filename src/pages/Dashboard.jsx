import { useMemo, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Footer from "../components/Footer";

export default function Dashboard() {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;
  const [activeTab, setActiveTab] = useState("holdings");

  const trades =
  email
    ? JSON.parse(localStorage.getItem(`trades_${email}`)) || []
    : [];

  
  const startingCash = 100000;

  const stats = useMemo(() => {
    const holdings = {};
    let invested = 0;

    trades.forEach((trade) => {
      if (!holdings[trade.symbol]) {
        holdings[trade.symbol] = {
          symbol: trade.symbol,
          shares: 0,
          invested: 0,
        };
      }

      if (trade.type === "BUY") {
        holdings[trade.symbol].shares += trade.qty;
        holdings[trade.symbol].invested += trade.total;
        invested += trade.total;
      } else {
        holdings[trade.symbol].shares -= trade.qty;
        holdings[trade.symbol].invested -= trade.total;
        invested -= trade.total;
      }
    });

    const activeHoldings = Object.values(holdings).filter(
      (stock) => stock.shares > 0
    );

    const portfolioValue = activeHoldings.reduce(
      (sum, stock) => sum + stock.invested,
      0
    );

    return {
      holdings: activeHoldings,
      portfolioValue,
      totalInvested: invested > 0 ? invested : 0,
      totalShares: activeHoldings.reduce(
        (sum, stock) => sum + stock.shares,
        0
      ),
      availableCash: startingCash - invested,
      totalTrades: trades.length,
    };
  }, [trades]);

  return (
    <>
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h1>Portfolio Dashboard</h1>
          <p className="dashboard-subtitle">Welcome back</p>
        </div>

        <Link to="/trade" className="trade-btn">
          Start Trading →
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card green">
          <span>Portfolio Value</span>
          <h2>₹{stats.portfolioValue.toFixed(2)}</h2>
          <p>Current portfolio worth</p>
        </div>

        <div className="stat-card blue">
          <span>Total Invested</span>
          <h2>₹{stats.totalInvested.toFixed(2)}</h2>
          <p>Amount currently invested</p>
        </div>

        <div className="stat-card purple">
          <span>Total Shares</span>
          <h2>{stats.totalShares}</h2>
          <p>Across all holdings</p>
        </div>

        <div className="stat-card orange">
          <span>Available Cash</span>
          <h2>₹{stats.availableCash.toFixed(2)}</h2>
          <p>Ready for new trades</p>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="dashboard-left">
          <div className="dashboard-tabs">
            <button
              className={activeTab === "holdings" ? "active" : ""}
              onClick={() => setActiveTab("holdings")}
            >
              Holdings
            </button>

            <button
              className={activeTab === "activity" ? "active" : ""}
              onClick={() => setActiveTab("activity")}
            >
              Activity
            </button>

            <button
              className={activeTab === "watchlist" ? "active" : ""}
              onClick={() => setActiveTab("watchlist")}
            >
              Watchlist
            </button>
          </div>

          <div className="dashboard-panel">
            {activeTab === "holdings" && (
              <>
                {stats.holdings.length === 0 ? (
                  <div className="placeholder-section">
                    <div className="placeholder-icon">📊</div>
                    <h3>No holdings yet</h3>
                    <p>
                      Start trading and your portfolio holdings will appear
                      here.
                    </p>

                    <Link to="/trade" className="placeholder-btn">
                      Go to Trade
                    </Link>
                  </div>
                ) : (
                  <div className="holdings-list">
                    {stats.holdings.map((stock) => (
                      <div className="holding-row" key={stock.symbol}>
                        <div className="holding-left">
                          <div className="holding-avatar">
                            {stock.symbol.slice(0, 2)}
                          </div>

                          <div>
                            <h4>{stock.symbol}</h4>
                            <p>{stock.shares} shares owned</p>
                          </div>
                        </div>

                        <div className="holding-right">
                          ₹{stock.invested.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "activity" && (
              <>
                {trades.length === 0 ? (
                  <div className="placeholder-section">
                    <div className="placeholder-icon">🕒</div>
                    <h3>No activity yet</h3>
                    <p>
                      Your buy and sell actions will show here after you start
                      trading.
                    </p>
                  </div>
                ) : (
                  <div className="activity-list">
                    {[...trades]
                      .reverse()
                      .slice(0, 10)
                      .map((trade, index) => (
                        <div className="activity-row" key={index}>
                          <div>
                            <h4>
                              {trade.type} · {trade.symbol}
                            </h4>
                            <p>{trade.time}</p>
                          </div>

                          <div className="activity-right">
                            <span
                              className={
                                trade.type === "BUY"
                                  ? "activity-buy"
                                  : "activity-sell"
                              }
                            >
                              {trade.qty} shares
                            </span>

                            <strong>₹{trade.total.toFixed(2)}</strong>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </>
            )}

            {activeTab === "watchlist" && (
              <div className="placeholder-section">
                <div className="placeholder-icon">⭐</div>
                <h3>Watchlist coming soon</h3>
                <p>
                  Save favourite stocks here and monitor them more easily.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="dashboard-right">
          <div className="side-card">
            <h3>Quick Stats</h3>

            <div className="side-row">
              <span>Total Holdings</span>
              <strong>{stats.holdings.length}</strong>
            </div>

            <div className="side-row">
              <span>Total Trades</span>
              <strong>{stats.totalTrades}</strong>
            </div>

            <div className="side-row">
              <span>Cash Left</span>
              <strong>₹{stats.availableCash.toFixed(0)}</strong>
            </div>
          </div>

          <Link to="/trade" className="side-action green">
            <div>
              <h3>Trade Stocks</h3>
              <p>25 stocks · Live prices</p>
            </div>

            <span>→</span>
          </Link>

          <Link to="/advisor" className="side-action dark">
            <div>
              <h3>Market Analysis</h3>
              <p>Discover recommended stocks</p>
            </div>

            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
    <Footer />
  </>
  );
}
