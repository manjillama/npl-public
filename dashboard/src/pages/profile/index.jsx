import React, { useEffect, useState } from "react";
import { withDashboard } from "../../hoc";
import ProfileForm from "../../components/forms/profile-form";
import PasswordChangeForm from "../../components/forms/change-password-form";
import api from "../../api";
import { Button, Spinner } from "react-bootstrap";
import { GrRefresh } from "react-icons/gr";

const StaffAccessToken = () => {
  const [accessToken, setAccessToken] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    api.get("/user/api-key").then(({ data }) => {
      setAccessToken(data.data.apiKey);
      setFetching(false);
    });
  }, []);

  function refreshAccessToken() {
    let text =
      "Warning! your apps using previous access token will no longer work.";
    if (window.confirm(text) == true) {
      api.put("/user/api-key").then(({ data }) => {
        setAccessToken(data.data.apiKey);
        setFetching(false);
      });
    }
  }

  return (
    <div className="body-card">
      <strong>Staff access token</strong>
      <div>
        {fetching ? (
          <Spinner as="span" animation="border" size="sm" role="status" />
        ) : (
          <div className="d-flex">
            <div className="bg-dark text-white p-2">{accessToken}</div>
            <Button variant="ghost" onClick={refreshAccessToken}>
              <GrRefresh />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfilePage = () => {
  return (
    <div className="container">
      <ProfileForm />
      <br />
      <PasswordChangeForm />
      <br />
      <StaffAccessToken />
    </div>
  );
};

export default withDashboard(ProfilePage);
