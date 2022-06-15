import React from "react";
import { withDashboard } from "../../hoc";
import ProfileForm from "../../components/forms/profile-form";
import PasswordChangeForm from "../../components/forms/change-password-form";

const ProfilePage = () => {
  return (
    <div className="container">
      <ProfileForm />
      <br />
      <PasswordChangeForm />
    </div>
  );
};

export default withDashboard(ProfilePage);
