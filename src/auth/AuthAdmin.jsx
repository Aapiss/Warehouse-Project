import React, { useState } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthAdmin = () => {
  const { user, role } = useAuth();
  const location = useLocation();

  const [keyUser, setKeyUser] = useState(
    localStorage.getItem("sb-arhqdstuioabzeolisnj-auth-token")
  );

  return keyUser ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
};

export default AuthAdmin;
