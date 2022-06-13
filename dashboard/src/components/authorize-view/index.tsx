import React, { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { selectAuth } from "../../slices/auth";

const AuthorizeView = ({
  authorizedRoles,
  children,
  Fallback,
}: {
  authorizedRoles: string[];
  children: React.ReactNode;
  Fallback?: FunctionComponent;
}): JSX.Element | null => {
  const auth = useSelector(selectAuth);

  const isAuthorized = authorizedRoles.some((role: string) => {
    return auth?.user.roles?.includes(role);
  });
  if (!isAuthorized) return Fallback ? <Fallback /> : null;
  return <>{children}</>;
};

export default AuthorizeView;
