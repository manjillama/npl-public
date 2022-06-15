import React, { SyntheticEvent, useState } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import api from "../../../api";
import { Form, TextInput } from "../../form-ui";

const PasswordChangeForm = (): JSX.Element => {
  const [formProps, setFormProps] = useState({
    currentPassword: "",
    newPassword: "",
  });
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
      .put("/user/change-password", formProps)
      .then(({ data: { data } }) => {
        setSubmitting(false);
        setFormProps({
          currentPassword: "",
          newPassword: "",
        });
        localStorage.setItem("token", data.token);
      })
      .catch((err) => {
        setError(err.response?.data?.message);
        setSubmitting(false);
      });
  }

  return (
    <>
      <h4 className="section-title">Change Password</h4>
      <div className="body-card">
        <Row>
          <Col>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form submitting={submitting} onSubmit={handleSubmit}>
              <TextInput
                type="password"
                name="currentPassword"
                value={formProps.currentPassword}
                label="Current passsword"
                onChange={handleOnChange}
              />
              <TextInput
                type="password"
                name="newPassword"
                value={formProps.newPassword}
                label="New password"
                onChange={handleOnChange}
              />
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PasswordChangeForm;
