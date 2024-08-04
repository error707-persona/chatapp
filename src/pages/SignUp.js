import React from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googlelogo from "../assests/google.avif";
import {doCreateUserWithEmailAndPassword} from "../auth.js"



const Login = () => {
  let googleProvider = new GoogleAuthProvider();
  const handleSignIn = () => {
    // AUTH ****************
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        window.location.href = "/chatapp";
      })
      .catch((err) => {
        window.location.href = "/";
      });
  };

  const handleSubmit = (event) => {
    // event.preventDefault();
    console.log("hello world")
  } 
  return (
    <div>
      <div className="h-14 w-screen bg-blue-600 top-0 sticky flex items-center">
        <div className="text-white font-bold pl-5">ChatApp</div>
      </div>
      <div className="flex h-screen flex-col items.center bg-blue-300">
        <div className="h-96 rounded-md shadow-md w-80 mx-auto my-auto bg-white flex flex-col items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Email,Username"
            className="border-2 rounded-lg p-2 outline-none w-2/3"
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-lg p-2 outline-none w-2/3"
          />
          <button onClick={handleSubmit} className="h-10 w-2/3 bg-blue-600 text-white rounded-lg">
            Login
          </button>
          <div className="flex">
            Dont have an account? &nbsp;{" "}
            <p className="text-blue-600 font-bold"> Sign Up</p>
          </div>
          <p className="font-bold text-black">OR</p>
          {auth.currentUser ? (
            ""
          ) : (
            <button
              onClick={handleSignIn}
              className="h-10 w-2/3 border-2 border-blue-600 rounded-lg flex justify-center items-center"
            >
              <img src={googlelogo} width={20} height={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
