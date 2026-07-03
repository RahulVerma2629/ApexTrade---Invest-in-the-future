import { SignIn, SignUp, useUser, useClerk } from "@clerk/clerk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "/styles/Auth.css";
import ConfirmationModal from "../components/ConfirmationModal";

export default function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useClerk();
  const { user, isSignedIn } = useUser();

  const isSignUp = location.pathname.includes("signup");
  const [showAlreadyLogged, setShowAlreadyLogged] = useState(false);

  // 🔄 Redirect after login
  useEffect(() => {
    if (!isSignedIn) return;

    if (
      location.pathname.startsWith("/auth/signin") ||
      location.pathname.startsWith("/auth/signup")
    ) {
      setShowAlreadyLogged(true);
    }
  }, [isSignedIn, location.pathname]);

  // 👤 Guest access
  const handleGuest = () => {
    localStorage.setItem("guest", "true");
    navigate("/dashboard");
  };

  const logoutAndContinue = async () => {
    setShowAlreadyLogged(false);

    localStorage.removeItem("guest");
    localStorage.removeItem("dbUser");

    await signOut({
      redirectUrl: "/auth/signin",
    });
  };

  return (
    <div>
      <img className="Logo-ApexTrade" src="/ApexTrade.png" alt="Logo" />
      <div className="auth-wrapper">
        <div className="auth-card">

          {!isSignedIn && (
            <div className="clerk">
              {isSignUp ? (
                <SignUp
                  path="/auth/signup"
                  routing="path"
                  signInUrl="/auth/signin"
                  forceRedirectUrl="/dashboard"
                />
              ) : (
                <SignIn
                  path="/auth/signin"
                  routing="path"
                  signUpUrl="/auth/signup"
                  forceRedirectUrl="/dashboard"
                />
              )}
            </div>
          )}

          <div className="guest-divider">OR</div>

          <button className="guest-btn" onClick={handleGuest}>
            Continue as Guest
          </button>

        </div>
      </div>

      <ConfirmationModal
        open={showAlreadyLogged}
        title="Already Signed In"
        message="You are currently signed in as"
        email={user?.primaryEmailAddress?.emailAddress}
        confirmText="Logout & Continue"
        cancelText="Stay Logged In"
        onCancel={() => {
          setShowAlreadyLogged(false);
          navigate("/dashboard");
        }}
        onConfirm={logoutAndContinue}
      />
      
    </div>
  );
}
