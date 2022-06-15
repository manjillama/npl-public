import React, { SyntheticEvent, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../api";
import { IUser } from "../../../interfaces";
import { Form, TextInput } from "../../form-ui";
import { selectUser, updateUser } from "../../../slices/auth";
import { AppDispatch } from "../../../store";

const ProfileForm = (): JSX.Element => {
  const user = useSelector(selectUser);
  const dispatch: AppDispatch = useDispatch();

  const [formProps, setFormProps] = useState<IUser>(user);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;

    setFormProps({ ...formProps, [name]: value });
  }

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    api
      .patch("/user/profile", formProps)
      .then(({ data: { data } }) => dispatch(updateUser(data.user)))
      .then(() => setSubmitting(false))
      .catch((err) => {
        setError(err.response?.data?.message);
        setSubmitting(false);
      });
  }

  return (
    <>
      <div className="head-panel d-flex">
        <div className="head-left">
          <h1 className="page-title">{user?.name}</h1>

          {user.roles.map((role, i) => (
            <span key={i} className="badge bg-info" style={{ marginRight: 4 }}>
              {role.split("ROLE_")[1]}
            </span>
          ))}
        </div>
        <div className="head-right"></div>
      </div>

      <h4 className="section-title">Profile</h4>
      <div className="body-card">
        <Row>
          <Col>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form submitting={submitting} onSubmit={handleSubmit}>
              <TextInput
                name="name"
                value={formProps.name}
                label="Full name"
                onChange={handleOnChange}
              />
              <TextInput
                type="email"
                name="email"
                value={formProps.email}
                label="Email"
                onChange={handleOnChange}
              />
              <TextInput
                type="number"
                name="phoneNumber"
                value={formProps.phoneNumber}
                label="Phone number"
                onChange={handleOnChange}
              />
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileForm;
