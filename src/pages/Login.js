import React from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googlelogo from "../assests/google.avif";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  
  let googleProvider = new GoogleAuthProvider();
  const handleSignIn = () => {
    // AUTH ****************
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        // window.location.href = "/chatapp";
        navigate("/chatapp");
      })
      .catch((err) => {
        // window.location.href = "/";
        navigate("/");
      });
  };
  return (
    <div className="login">
      {(auth.currentUser)?"":<button onClick={handleSignIn} className="google">
        <img src={googlelogo} width={50} height={50} />
      </button>}
    </div>
  );
};

export default Login;
