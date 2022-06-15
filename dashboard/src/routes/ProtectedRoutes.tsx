import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFoundPage from "../components/commons/NotFound";
import { ROLES } from "../constants";
import { Homepage, RestroomsPage } from "../pages";
import { selectAuth } from "../slices/auth";

function ProtectedRoute() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute
            authorizedRoles={[ROLES.admin]}
            component={<Homepage />}
          />
        }
      />
      <Route
        path="/restrooms"
        element={
          <PrivateRoute
            authorizedRoles={[ROLES.admin]}
            component={<RestroomsPage />}
          />
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

function PrivateRoute({
  component,
  authorizedRoles,
}: {
  component: ReactNode;
  authorizedRoles: string[];
}): JSX.Element {
  const auth = useSelector(selectAuth);

  const isAuthorized = authorizedRoles.some((role: string) => {
    return auth?.user.roles.includes(role);
  });

  return isAuthorized ? <>{component}</> : <NotFoundPage />;
}

export default ProtectedRoute;
