import { SignIn, SignUp, useUser } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "/styles/Auth.css";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  const isSignUp = location.pathname.includes("signup");

  // 🔄 Redirect after login
  useEffect(() => {
    if (isSignedIn) {
      localStorage.setItem("guest", "true");
      navigate("/dashboard");
    }
  }, [isSignedIn, navigate]);

  // 👤 Guest access
  const handleGuest = () => {
    localStorage.setItem("guest", "true");
    navigate("/dashboard");
  };

  return (
    <div>
      <img className="Logo-ApexTrade" src="/ApexTrade.png" alt="Logo" />
      <div className="auth-wrapper">
        <div className="auth-card">

          <div className="clerk">
            {isSignUp ? (
              <SignUp
                path="/auth/sign-up"
                routing="path"
                signInUrl="/auth/sign-in"
              />
            ) : (
              <SignIn
                path="/auth/sign-in"
                routing="path"
                signUpUrl="/auth/sign-up"
              />
            )}
          </div>

          <div className="guest-divider">OR</div>

          <button className="guest-btn" onClick={handleGuest}>
            Continue as Guest
          </button>

        </div>
      </div>
    </div>
  );
}
