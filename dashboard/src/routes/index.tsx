import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import { Homepage, LoginPage } from "../pages";
import NotFoundPage from "../components/commons/NotFound";
import ProtectedRoute from "./ProtectedRoutes";
import { ROLES } from "../constants";
import { useSelector } from "react-redux";
import { selectAuth } from "../slices/auth";

function AppRoutes(): JSX.Element {
  const auth = useSelector(selectAuth);

  return (
    <BrowserRouter>
      <App>
        <Routes>
          {auth ? (
            <Route
              path="/"
              element={
                <ProtectedRoute
                  authorizedRoles={[ROLES.admin]}
                  component={<Homepage />}
                />
              }
            />
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </App>
    </BrowserRouter>
  );
}

export default AppRoutes;
