import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";
import StaffForm from "../../components/forms/staff-form";
import api from "../../api";
import { withDashboard } from "../../hoc";
import { IStaff } from "../../interfaces";

const AddStaffPage = (): JSX.Element => {
  const [formProps, setFormProps] = useState<IStaff>({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    roles: [],
  });
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const [error, setError] = useState("");

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    api
      .post("/staffs", formProps)
      .then(() => {
        setSubmitting(false);
        navigate(`/staffs`);
      })
      .catch((error) => {
        setSubmitting(false);
        setError(error.response.data.message);
      });
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, value, checked } = event.currentTarget;

    if (name === "roles") {
      let roles = [];
      if (checked) roles = [...formProps.roles, value];
      else roles = formProps.roles?.filter((r) => r !== value) as string[];

      return setFormProps({
        ...formProps,
        roles,
      });
    }

    setFormProps({
      ...formProps,
      [name]: value,
    });
  }

  return (
    <div className="container">
      <div className="head-panel d-flex">
        <div className="head-left">
          <h1 className="page-title">Add Staff</h1>
        </div>
        <div className="head-right"></div>
      </div>
      <div className="body-card">
        {error && <Alert variant="danger">{error}</Alert>}
        <StaffForm
          submitting={submitting}
          isEdit={false}
          onSubmit={onSubmit}
          handleChange={handleChange}
          formProps={formProps}
        />
      </div>
    </div>
  );
};

export default withDashboard(AddStaffPage);
