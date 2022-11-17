import { useState } from "react";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import { Link } from "react-router-dom";
import bg from "../styles/login-bg.jpg"
import "../styles/Login.css";
function Login({ onLogin }) {

  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="login">
      <div className="login-left">
        <img src={bg} style={{opacity:0.9}}></img>
      </div> 
      <div className="login-right">
        <Link to="/"></Link>

        {showLogin ? (
          <>
            <LoginForm onLogin={onLogin} />
            <div />
            <p className="small-text">
              Don't have an account? &nbsp;
              <button
                onClick={() => {
                  setShowLogin(false);
                }}
              >
                Sign Up
              </button>
            </p>
          </>
        ) : (
          <>
            <SignUpForm onLogin={onLogin} />
            <div />
            <p className="small-text">
              Already have an account? &nbsp;
              <button
                onClick={() => {
                  setShowLogin(true);
                }}
              >
                Log In
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
