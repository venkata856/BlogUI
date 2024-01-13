import "../index.css";
import axios from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const REGISTER_URL = "/user/register";

function Register() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = axios.post(
        REGISTER_URL,
        {
          firstname,
          lastname,
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      console.log(response);

      setFirstName("");
      setLastName("");
      setUserName("");
      setPassword("");

      navigate("/", { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing required fields");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Registering user Failed");
      }
    }
  };

  return (
    <form className="RegisterForm" onSubmit={handleSubmit}>
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
      </p>
      <h4 className="formHeading">Register</h4>
      <div className="firstname-se sectioned">
        <label htmlFor="firstname">Firstname:</label>
        <input
          type="text"
          id="firstname"
          className="firstname"
          autoComplete="off"
          name="firstname"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstname}
          required
        ></input>
      </div>
      <div className="lastname-se sectioned">
        <label htmlFor="lastname">Lastname:</label>
        <input
          type="text"
          id="lastname"
          className="lastname"
          autoComplete="off"
          name="lastname"
          onChange={(e) => setLastName(e.target.value)}
          value={lastname}
          required
        ></input>
      </div>
      <div className="username-se sectioned">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="username"
          name="username"
          required
          onChange={(e) => setUserName(e.target.value)}
          value={username}
          autoComplete="off"
        ></input>
      </div>
      <div className="password-se sectioned">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="password"
          name="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        ></input>
      </div>

      <button className="submit" type="submit">
        Sign Up
      </button>
    </form>
  );
}

export default Register;
