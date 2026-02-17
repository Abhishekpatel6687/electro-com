import { useState } from "react";
import styled from "styled-components";
import API from "../../services/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", loginForm);

      const userRes = await axios.get(
        "http://localhost:8080/api/auth/me",
        { withCredentials: true }
      );

      setUser(userRes.data.user);

      if (userRes.data.user.role === "superadmin") {
        navigate("/prodashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", registerForm);
      alert("Registered Successfully");
      setIsLogin(true);
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <Wrapper>
      <div className={`container ${isLogin ? "" : "right-panel-active"}`}>
        
        {/* SIGN UP */}
        <div className="form-container sign-up-container">
          <form onSubmit={handleRegister}>
            <h1>Create Account</h1>
            <input
              placeholder="Name"
              onChange={(e) =>
                setRegisterForm({ ...registerForm, username: e.target.value })
              }
            />
            <input
              placeholder="Email"
              onChange={(e) =>
                setRegisterForm({ ...registerForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setRegisterForm({ ...registerForm, password: e.target.value })
              }
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        {/* LOGIN */}
        <div className="form-container sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign in</h1>
            <input
              placeholder="Email"
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
            />
            <button type="submit">Sign In</button>
          </form>
        </div>

        {/* OVERLAY */}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected please login</p>
              <button onClick={() => setIsLogin(true)}>
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your details and start journey</p>
              <button onClick={() => setIsLogin(false)}>
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </Wrapper>
  );
}

export default AuthPage;
const Wrapper = styled.div`
  height: 100vh;
  // background: linear-gradient(120deg, #4e73df, #224abe);
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    background: #fff;
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    width: 900px;
    max-width: 100%;
    min-height: 550px;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
  }

  .form-container {
    position: absolute;
    top: 0;
    height: 100%;
    width: 50%;
    transition: all 0.6s ease-in-out;
  }

  .sign-in-container {
    left: 0;
    z-index: 2;
  }

  .sign-up-container {
    left: 0;
    opacity: 0;
    z-index: 1;
  }

  .container.right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  }

  form {
    background: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 0 50px;
    justify-content: center;
    align-items: center;
    height: 100%;
    text-align: center;
  }

  input {
    background: #f0f0f0;
    border: none;
    padding: 12px 15px;
    margin: 8px 0;
    width: 100%;
    border-radius: 8px;
  }

  button {
    border-radius: 20px;
    border: none;
    padding: 12px 45px;
    background: #4e73df;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }

  .overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
  }

  .container.right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .overlay {
    background: linear-gradient(120deg, #4e73df, #224abe);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay-panel {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
  }

  .overlay-left {
  margin-left:100px;
    transform: translateX(-20%);
  }

  .overlay-right {
    right: 0;
    transform: translateX(0);
  }
`;