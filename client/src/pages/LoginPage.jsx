import React, { useState } from "react";
import "../styles/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/global.css";
import axios from "axios";
import Loading from "../components/Loading/Loading";
import Error from "../components/ShowError/error";
import Demo from "../components/demo";
import ResetPassword from "../components/passwordReset/GetUserInfo";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [tryDemo, setTryDemo] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);

  const navigate = useNavigate();



  const handlePasswordReset = () => {

  }

  const handleLogin = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });

      const { token, message, id, user } = response.data;
      localStorage.setItem("token", token);

      if (message === "Logged in successfully") {
        try {
          if (user.position === "System Administrator") {
            navigate(`/user/adminPanel/${id}`);
          }
          else if (user.account === "active") {
            navigate(`/user/${id}`);
          } else {
            setErrorMessage(
              "your account is deactivated, please contact The administrator"
            );
          }
        } catch (error) {
          console.error("Error storing token in local storage:", error);
          setErrorMessage(
            "An error occurred during login. Please try again later."
          );
        }
      } else {
        console.error("Login error:", message);
        setErrorMessage(
          "Invalid credentials. Please check your email and password."
        );
      }
    } catch (error) {
      console.error("Server error:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
    setIsLoading(false);
  };

  return (
    <>
      {errorMessage !== "" && (
        <Error message={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      <div className="login-page">
        <div className="image-background">
          <h1>Welcome to Debremarkos University Project management system!</h1>
          <p>
            Please enter your login credentials to access your account. As an
            employee of our university, you can securely access our platform. We
            prioritize the confidentiality of your information. Unauthorized
            access is strictly prohibited.
          </p>

          <span className="demo" onClick={() => setTryDemo(true)}>
            Try Demo
          </span>
          {
            tryDemo && < Demo setTryDemo ={setTryDemo}/ >
          }
        </div>
        {isLoading && <Loading />}
        {!isLoading && (
          <div className="login-form">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <button type="submit" className="login-button">
                  Login
                </button>
              </div>
              <div>
              <NavLink className="account" to={"/register"}>
                don't you have an account?
              </NavLink>
              < NavLink className = "account"
              onClick = {
                () => setResetPassword(true)
              } >
                forgot your password?
              </NavLink>
              </div>
            </form>
          </div>
        )}
      </div>

     {
       resetPassword && <ResetPassword setResetPassword = {
        setResetPassword
      }
      />}
    </>
  );
}
