import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    axios
      .get("/auth/me")
      .then(() => setIsAuth(true))
      .catch(() => setIsAuth(false));
  }, []);

  if (isAuth === null) return <p>Loading...</p>;

  return isAuth ? children : <Navigate to="/dashboard" replace />;
}