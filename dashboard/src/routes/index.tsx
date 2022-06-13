import React from "react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import ProtectedRoute from "./ProtectedRoutes";
import { useSelector } from "react-redux";
import { selectAuth } from "../slices/auth";
import PublicRoutes from "./PublicRoutes";

function AppRoutes(): JSX.Element {
  const auth = useSelector(selectAuth);

  return (
    <BrowserRouter>
      <App>{auth ? <ProtectedRoute /> : <PublicRoutes />}</App>
    </BrowserRouter>
  );
}

export default AppRoutes;
