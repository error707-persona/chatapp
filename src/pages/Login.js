import React from "react";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import googlelogo from "../assests/google.avif";
import { doSignInWithEmailAndPassword } from "../auth";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import img from "../assests/chatapp.png"

const Login = () => {
  let googleProvider = new GoogleAuthProvider();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isSigninIn, setisSigninIn] = useState(false)
  const [errorMessage, seterrorMessage] = useState("")

  const handleSignIn = () => {
    // AUTH ****************
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        window.location.href = "/chatapp";
        setisSigninIn(true);
      })
      .catch((err) => {
        window.location.href = "/";
        setisSigninIn(false);
      });
  };

  const OnSubmit = async (e) => {
    e.preventDefault()
    console.log("logged in")
    // if (!isSigninIn) {
      
    //   setisSigninIn(true);
    //   try {
    //     await doSignInWithEmailAndPassword(email, password)
    //     window.location.href = "/chatapp";
    //     console.log("hello world")
    //   } catch (error) {
    //     seterrorMessage(error.message)
    //   }
    // }
  }

  return (
    <div>
      <div>
        <img src={img} alt="ChatAppLogo" height={50} width={50}/>
      </div>
      <div className="flex h-screen flex-col items.center bg-blue-300">
        <div className="h-96 pl-2 rounded-md shadow-md w-80 mx-auto my-auto bg-white flex flex-col items-center justify-center gap-3">
          <input
            type="email"
            placeholder="Email,Username"
            className="border-2 rounded-lg p-2 outline-none w-2/3"
            value={email}
            onChange={(e)=>setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border-2 rounded-lg p-2 outline-none w-2/3"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
          />
          <button onClick={OnSubmit} className="h-10 w-2/3 bg-blue-600 text-white rounded-lg">
            Login
          </button>
          <div className="flex">
            Dont have an account? &nbsp;{" "}
            <p className="text-blue-600 font-bold"> Sign Up</p>
          </div>
          <p className="font-bold text-black">OR</p>
          {/* {auth.currentUser ? (
            ""
          ) : ( */}
            <button
              onClick={handleSignIn}
              className="h-10 w-2/3 border-2 border-gray-400 rounded-lg flex justify-center items-center"
            >
              <img src={googlelogo} width={20} height={20} className="mr-2"/> Continue with Google
            </button>
          {/* // )} */}
        </div>
      </div>
    </div>
  );
};

export default Login;
