import React, { ReactNode } from "react";
import { useSelector } from "react-redux";
import NotFound from "../components/commons/NotFound";
import { selectAuth } from "../slices/auth";

function ProtectedRoute({
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

  return isAuthorized ? <>{component}</> : <NotFound />;
}

export default ProtectedRoute;
