import React, { useState } from "react";
import "./login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
 const [warning, setWarning] = useState(false)
  const navigate = useNavigate()

  const handleClick = async (e) => {
    if (email === "") setCheckEmail("email");
    else setCheckEmail("");
    if (password === "") setCheckPassword("password");
    else setCheckPassword("");
    if (email !== "" && password !== "" && password.length > 7) {

      console.log("clicked");
      let res = await axios.post(
        "http://localhost:3001/login",
        JSON.stringify({ email: email, password: password }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        } 
      );
      if(res.data) {
          navigate('/')
          localStorage.setItem('user',JSON.stringify({email}))
      }
      else setWarning(true) 
    }
  };

  return (
    <div className="main-div">
      <main className="form-signin">
        <form>
          <h1 className="h3 mb-3 fw-normal">Please Log in</h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            {checkEmail === "email" && (
              <p className="warning"> *Please Fill The Email</p>
            )}
            <label for="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              
                if (password.length < 7)
                  document.getElementById("validation").innerHTML =
                    "*Password must be 8 Characters";
                else document.getElementById("validation").innerHTML = "";
              }}
              value={password}
            />
            {checkPassword === "password" && (
              <p className="warning"> *Please Fill The Password</p>
            )}
            <label for="floatingPassword">Password</label>
          </div>
          <p id="validation" className="warning"></p>
          <button
            className="w-100 btn btn-lg btn-primary"
            type="button"
            onClick={handleClick}
          >
            Log in
          </button>
          {warning && <p className="warning">Enter correct Details</p>}
        </form>
        
      </main>
    </div>
  );
};

export default Login;
