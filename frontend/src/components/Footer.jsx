import { Link } from "react-router-dom";
import "/src/App.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>ApexTrade</h2>
          <p>
            Practice trading with virtual money. Learn investing
            without risking real capital.
          </p>
        </div>

        {/* Links */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <Link to="/home">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/trade">Trade</Link>
          <Link to="/advisor">Advisor</Link>
        </div>

        {/* Legal */}
        <div className="footer-links">
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Disclaimer</a>
        </div>

        {/* CTA */}
        <div className="footer-cta">
          <h4>Start Practicing</h4>
          <p>Trade risk-free with virtual funds.</p>
          <Link to="/dashboard" className="footer-btn">
            Go to Dashboard
          </Link>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ApexTrade. All rights reserved.
      </div>
    </footer>
  );
}
