import { SignUp } from "@clerk/clerk-react";
import "/styles/Auth.css";

export default function Signup() {
  return (
    <div className="Signup-auth-container">
      <div className="clerk-wrapper">
        <SignUp />
      </div>
    </div>
  );
}
