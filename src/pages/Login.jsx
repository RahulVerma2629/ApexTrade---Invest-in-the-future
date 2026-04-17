import { SignIn } from "@clerk/clerk-react";
import "/styles/Auth.css";

export default function Login() {
  return  (
    <div className="Login-auth-container">
      <div className="clerk-wrapper">
        <SignIn path="login"/>
      </div>
    </div>
  );
}
