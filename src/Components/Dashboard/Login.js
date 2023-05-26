import React from "react";
import { signInWithGoogle } from "../../firebase";

const Login = () => {
  return (
    <div className="dashboard">
      <button className="btn" onClick={signInWithGoogle}>
        Sign In using Google Account
      </button>
    </div>
  );
};

export default Login;
