import React, { ReactNode } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import NotFoundPage from "../components/commons/NotFound";
import { ROLES } from "../constants";
import {
  AddRestroomPage,
  Homepage,
  ProfilePage,
  RestroomPage,
  RestroomsPage,
  UpdateRestroomPage,
} from "../pages";
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
      <Route
        path="/restrooms/add"
        element={
          <PrivateRoute
            authorizedRoles={[ROLES.admin]}
            component={<AddRestroomPage />}
          />
        }
      />
      <Route
        path="/restrooms/:id"
        element={
          <PrivateRoute
            authorizedRoles={[ROLES.admin]}
            component={<RestroomPage />}
          />
        }
      />
      <Route
        path="/restrooms/:id/edit"
        element={
          <PrivateRoute
            authorizedRoles={[ROLES.admin]}
            component={<UpdateRestroomPage />}
          />
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute
            authorizedRoles={[ROLES.admin]}
            component={<ProfilePage />}
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
