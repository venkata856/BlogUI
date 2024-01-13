import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../index.css";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const LOGIN_URL = "/user/login";

function Form() {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );

      const accessToken = response?.data?.accessToken;
      const refreshToken = response?.data?.refreshToken;
      const admin = response?.data?.admin;

      setAuth({ user, accessToken, refreshToken, admin });
      setUser("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <>
      <section className="login_form">
        <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
          {errMsg}
        </p>
        <h1 className="heading-login">LogIn</h1>
        <form className="loginForm" onSubmit={handleSubmit}>
          <div className="username-sec">
            <label htmlFor="username" className="label">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              autoComplete="off"
              required
            />
          </div>

          <div className="password-sec">
            <label htmlFor="password" className="label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
            />
          </div>

          <button className="submit-login">Submit</button>
        </form>
        <p>
          Create an Account <br></br>
        </p>
        <NavLink to="/signup">Sign up</NavLink>
      </section>
    </>
  );
}

export default Form;
