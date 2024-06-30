import React, { useState } from "react";
import "../styles/register.css";
import "../styles/global.css";
import WarningPage from "../components/warning/warning";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { RxAvatar } from "react-icons/rx";
import Error from "../components/ShowError/error";
import Loading from "../components/Loading/Loading";

export default function RegistrationPage() {
  // user registration states

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // react hooks
  const navigate = useNavigate();

  // Convert image file to base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  // Handle registration form submit
  const handleRegistration = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const profile = await toBase64(avatar);
      const response = await axios.post(
        "http://localhost:5000/auth/register",
        {
          email,
          password,
          profile,
          code,
        },
        {
          withCredentials: true,
        }
      );

      const { message } = response.data;
      switch (message) {
        case "user successfully created!":
          // Reset the form after successful registration
          setEmail("");
          setPassword("");
          setCode("");
          navigate("/login");
          break;
        case "Unable to find you in our employee database. Please contact our center in person for further discussion.":
          setErrorMessage(message);
          break;
        default:
          setErrorMessage("An unexpected error occurred: " + message);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 201) {
          setErrorMessage(error.response.data.message);
        } else if (error.response.status === 500) {
          setErrorMessage("Failed to register, please try again");
        }
      } else {
        console.log(error);
        setErrorMessage("An unexpected error occurred: " + error.message);
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      {isLoading && <Loading />}
      {errorMessage !== "" && (
        <Error message={errorMessage} setErrorMessage={setErrorMessage} />
      )}
      <div className="registration-page">
        <div className="image-background">
          <h1>Welcome to Debre Markos University Project Managment System!</h1>
          <p>
            Please provide the necessary information to register your account.
            By registering, you confirm your employment with our university. We are
            delighted to have you join our team. Access to our platform is
            exclusively for employees, ensuring a private and efficient
            collaboration space.
          </p>
        </div>

        <div className="registration-form">
          <h1>Registration</h1>
          <form onSubmit={handleRegistration}>
            <div className="form-group">
              <input
                placeholder="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Password"
                type="password"
                id="pasword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Employeement code"
                type="text"
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <div className="form-group profile">
              <label for="profile">
                <RxAvatar /> <p>set profile picture</p>
              </label>
              <input
                type="file"
                id="profile"
                hidden
                onChange={(e) => setAvatar(e.target.files[0])}
              />
            </div>

            <button type="submit">Sign up</button>
          </form>
          <NavLink className="account" to={"/login"}>
            Already have an account?
          </NavLink>
        </div>
      </div>
      <WarningPage />
    </>
  );
}
