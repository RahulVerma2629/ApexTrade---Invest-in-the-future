import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
    <div className="home-container">

      <section className="home-hero">
        <p className="hero-top">
          Practice Trading · Zero Risk · Virtual Simulation
        </p>

        <h1>
          Invest Smart.
          <br />
          Start Safe.
        </h1>

        <p className="hero-text">
          A beginner-friendly platform to practice real stock trading with
          virtual funds — no financial risk, no jargon.
        </p>

        <div className="home-buttons">
          <button className="dashboard-button" onClick={() => navigate("/dashboard")}>
            Go to Dashboard ➜
          </button>

          <button
            className="secondary"
            onClick={() => navigate("/trade")}
          >
            Start Trading
          </button>
        </div>
      </section>

      <section className="home-features">
        <div className="feature-card">
          <div className="feature-icon">💸</div>
          <h3>Risk-Free Trading</h3>
          <p>Trade with virtual money. Zero real losses, ever.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>AI Suggestions</h3>
          <p>Plain-English buy/sell hints from market trends.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📈</div>
          <h3>Live Portfolio</h3>
          <p>Watch your virtual portfolio update in real time.</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3>Learn As You Go</h3>
          <p>Every action explained in simple beginner-friendly language.</p>
        </div>
      </section>

      <section className="home-strip">
        <div className="strip-item">
          <h2>₹100,000</h2>
          <p>Starting Virtual Cash</p>
        </div>

        <div className="strip-item">
          <h2>25+</h2>
          <p>Live Stocks Available</p>
        </div>

        <div className="strip-item">
          <h2>0%</h2>
          <p>Real Financial Risk</p>
        </div>
      </section>

    </div>
    <Footer />
  </>
  );
}
