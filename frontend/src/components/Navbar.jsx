import { NavLink } from "react-router-dom";
import "/src/App.css";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
        Home
      </NavLink>

      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
        Dashboard
      </NavLink>

      <NavLink to="/trade" className={({ isActive }) => isActive ? "active" : ""}>
        Trade
      </NavLink>

      <NavLink to="/advisor" className={({ isActive }) => isActive ? "active" : ""}>
        Advisor
      </NavLink>

      <NavLink to="/auth/signin" className={({ isActive }) => isActive ? "active" : ""}>
        Login
      </NavLink>

      <NavLink to="/auth/signup" className={({ isActive }) => isActive ? "active" : ""}>
        Signup
      </NavLink>
    </nav>
  );
}