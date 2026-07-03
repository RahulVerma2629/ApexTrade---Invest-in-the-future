import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import StockAdvisor from "./pages/StockAdvisor";
import Trade from "./pages/Trade";
import Dashboard from "./pages/Dashboard";
import Auth from "./pages/Auth";

function Layout() {
  const location = useLocation();
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return null;
  }
  const isGuest = localStorage.getItem("guest") === "true";
  const isAuthenticated = isSignedIn || isGuest;

  // Hide navbar on auth pages
  const hideNavbar = location.pathname.startsWith("/auth");

  // 🔐 Protect routes
  const protect = (component) => {
    return isAuthenticated ? component : <Navigate to="/auth/signin" />;
  };

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Default */}
        <Route path="/" element={<Navigate to="/auth/signin" />} />

        {/* Auth */}
        <Route path="/auth/signin/*" element={<Auth />} />
        <Route path="/auth/signup/*" element={<Auth />} />

        <Route path="/auth/signin/sso-callback" element={<Auth />} />
        <Route path="/auth/signup/sso-callback" element={<Auth />} />

        {/* Protected */}
        <Route path="/home" element={protect(<Home />)} />
        <Route path="/advisor" element={protect(<StockAdvisor />)} />
        <Route path="/dashboard" element={protect(<Dashboard />)} />
        <Route path="/trade" element={protect(<Trade />)} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}