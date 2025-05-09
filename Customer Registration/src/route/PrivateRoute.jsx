import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate()

  if (loading) {
    return <p>Carregando...</p>; // Ou um spinner bonito
  }

  return user ? children : navigate("/")
};

export default PrivateRoute;