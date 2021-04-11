import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../Firebase";
import { userId } from "../utils";
import { notify } from "../utils";

function Register() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signInUser = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        auth && notify("Login Successful", "success");
        if (userId.includes(auth.user.uid)) {
          history.push("/home");
        } else {
          history.push("/");
        }
      })
      .catch((err) => notify(err.message, "error"));
  };

  const registerUser = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        auth && notify("Registration Successful", "success");
        if (userId.includes(auth.user.uid)) {
          history.push("/home");
        } else {
          history.push("/");
        }
      })
      .catch((err) => notify(err.message, "error"));
  };

  return (
    <section className="register-wrapper">
    <div className="register">
      <Link to="/">
        <img />
      </Link>

      <div className="register-container">
        <header className="title">
          <h1>SignIn</h1>
        </header>

        <form>
          <div className="form-row">
            <input
              type="text"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </div>
          <div className="form-row">
            <input
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <span>Password</span>
          </div>
          <div className="form-row"></div>
          <div className="form-row">
            <button type="submit" onClick={signInUser} className="button">
              Sign In
            </button>
          </div>
          <p className="message">
            Not registered?{" "}
            <button onClick={registerUser}> Create an account</button>
          </p>
        </form>
      </div>
    </div>
    </section>
  );
}

export default Register;
