import { useClerk } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import Footer from "../components/Footer";
import {syncUser,getUserTrades,
} from "../services/api";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Dashboard() {
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const handleLogout = async () => {
    setShowLogout(false);

    localStorage.removeItem("guest");
    localStorage.removeItem("dbUser");

    await signOut({
      redirectUrl: "/auth/signin",
    });
  };

  const { user, isLoaded, isSignedIn } = useUser();
  const [activeTab, setActiveTab] = useState("holdings");
  const [showLogout, setShowLogout] = useState(false);

  const [trades, setTrades] = useState([]);
  
  const startingCash = 100000;

  useEffect(() => {
    const syncCurrentUser = async () => {
      if (!isLoaded || !isSignedIn) return;

      try {
        const response = await syncUser({
          clerk_id: user.id,
          email: user.primaryEmailAddress.emailAddress,
          name: user.fullName,
        });

        console.log("✅ Synced User:", response.user);

        localStorage.setItem(
          "dbUser",
          JSON.stringify(response.user)
        );

        const userTrades = await getUserTrades(response.user.id);

        console.log("DATABASE TRADES:");
        console.log(userTrades);

        setTrades(userTrades);

      } catch (err) {
        console.error("User Sync Failed", err);
      }
    };

    syncCurrentUser();
  }, [isLoaded, isSignedIn, user]);

  const stats = useMemo(() => {
    const holdings = {};
    let invested = 0;

    trades.forEach((trade) => {
      const qty = Number(trade.quantity);
      const price = Number(trade.price);
      const total = qty * price;

      if (!holdings[trade.symbol]) {
        holdings[trade.symbol] = {
          symbol: trade.symbol,
          shares: 0,
          invested: 0,
        };
      }

      if (trade.trade_type === "BUY") {
        holdings[trade.symbol].shares += qty;
        holdings[trade.symbol].invested += total;
        invested += total;
      } else {
        holdings[trade.symbol].shares -= qty;
        holdings[trade.symbol].invested -= total;
        invested -= total;
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
      totalInvested: invested,
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

        <div style={{ display: "flex", gap: "10px" }}>
          <Link to="/trade" className="trade-btn">
            Start Trading →
          </Link>

          <button
            className="trade-btn"
            onClick={() => setShowLogout(true)}
            style={{
              background: "#dc2626",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card green">
          <span>Portfolio Value</span>
          <h2>${stats.portfolioValue.toFixed(2)}</h2>
          <p>Current portfolio worth</p>
        </div>

        <div className="stat-card blue">
          <span>Total Invested</span>
          <h2>${stats.totalInvested.toFixed(2)}</h2>
          <p>Amount currently invested</p>
        </div>

        <div className="stat-card purple">
          <span>Total Shares</span>
          <h2>{stats.totalShares}</h2>
          <p>Across all holdings</p>
        </div>

        <div className="stat-card orange">
          <span>Available Cash</span>
          <h2>${stats.availableCash.toFixed(2)}</h2>
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
                          ${stock.invested.toFixed(2)}
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
                              {trade.trade_type} · {trade.symbol}
                            </h4>

                            <p>
                              {new Date(trade.created_at).toLocaleString()}
                            </p>
                          </div>

                          <div className="activity-right">
                            <span
                              className={
                                trade.trade_type === "BUY"
                                  ? "activity-buy"
                                  : "activity-sell"
                              }
                            >
                              {trade.quantity} shares
                            </span>

                            <strong>
                              $
                              {(Number(trade.quantity) * Number(trade.price)).toFixed(2)}
                            </strong>
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
              <strong>${stats.availableCash.toFixed(0)}</strong>
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

    <ConfirmationModal
      open={showLogout}
      title="Logout?"
      message="You are about to logout from ApexTrade."
      email={user?.primaryEmailAddress?.emailAddress}
      confirmText="Logout"
      cancelText="Cancel"
      onCancel={() => setShowLogout(false)}
      onConfirm={handleLogout}
    />

    <Footer />
  </>
  );
}
