import React from "react";
import { useState } from "react";
import Logo from "../../img/logo.png";
import "./Auth.css";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password !== data.confirmpass && setConfirmPass(false);
    }
  };

  return (
    // Left Side
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1>Creative Nepal</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* Right Side  */}
      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Facebook Registration" : "Facebook Login"}</h3>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              type="text"
              className="infoInput"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
              />
            )}
          </div>
          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>

          <div>
            <span style={{ fontSize: "12px" }}>
              {isSignUp ? (
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.3rem",
                  }}
                >
                  Already have an account
                  <p
                    style={{
                      color: "blue",
                      opacity: "70%",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      resetForm();
                      setIsSignUp((prev) => !prev);
                    }}
                  >
                    Login
                  </p>
                </span>
              ) : (
                <span
                  style={{ display: "flex", alignItems: "center", gap: "2px" }}
                >
                  Don't have an account{" "}
                  <p
                    style={{
                      color: "blue",
                      opacity: "70%",
                      textDecoration: "underline",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      resetForm();
                      setIsSignUp((prev) => !prev);
                    }}
                  >
                    Signup
                  </p>{" "}
                </span>
              )}
            </span>
          </div>
          <button className="button infoButton" type="submit">
            {isSignUp ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
