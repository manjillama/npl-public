import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import api from "../../api";
import { withDashboard } from "../../hoc";
import Loader from "../../components/commons/Loader";
import { Alert, Col, Row } from "react-bootstrap";
import StaffForm from "../../components/forms/staff-form";
import { IStaff } from "../../interfaces";

const UpdateStaffPage = (): JSX.Element => {
  const [formProps, setFormProps] = useState<IStaff>({
    name: "",
    email: "",
    phoneNumber: "",
    roles: [],
  });
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { staffId } = useParams<{ staffId: string }>();

  useEffect(() => {
    api
      .get(`/staffs/${staffId}`)
      .then((response: AxiosResponse) => {
        setFormProps(response.data.data.staff);
        setFetching(false);
      })
      .catch((error) => {
        setFetchError(error);
        setFetching(false);
      });
  }, []);

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    api
      .patch(`/staffs/${staffId}`, formProps)
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

  if (fetching) return <Loader />;
  if (fetchError) return <Navigate to="/error" />;

  return (
    <div className="container">
      <Row>
        <Col>
          <div className="head-panel d-flex">
            <div className="head-left">
              <h1 className="page-title">Update Staff</h1>
              <span className="text-muted">Code: {staffId}</span>
            </div>
            <div className="head-right"></div>
          </div>
        </Col>
      </Row>
      <div className="body-card">
        {error && <Alert variant="danger">{error}</Alert>}
        <StaffForm
          submitting={submitting}
          isEdit
          onSubmit={onSubmit}
          handleChange={handleChange}
          formProps={formProps}
        />
      </div>
    </div>
  );
};

export default withDashboard(UpdateStaffPage);
