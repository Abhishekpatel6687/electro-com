// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const token = document.cookie.includes("token");

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return children;
// }

// export default ProtectedRoute;
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("token");

  if (!isAuth) {
    // return <Navigate to="/dashboard" />;
      return <Navigate to="/login" replace />;
  }

  return children;
}