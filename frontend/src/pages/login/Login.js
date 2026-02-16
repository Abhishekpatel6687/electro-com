import { useState } from "react";
import API from "../../services/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
const { setUser } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);
      alert(res.data.message);
      // navigate("/dashboard");
        // const userRes = await axios.get("/auth/me");
//         const userRes = await axios.get("/auth/me", {
//   withCredentials: true,
// });
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

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2>Login</h2> */}

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
