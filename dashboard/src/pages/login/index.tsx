import React, { SyntheticEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, TextInput } from "../../components/form-ui";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { login } from "../../slices/auth";
import { AppDispatch } from "../../store";
import { formatAxiosError } from "../../utils";

function LoginPage(): JSX.Element {
  const [formProps, setFormProps] = useState({
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const dispatch: AppDispatch = useDispatch();

  function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    dispatch(login(formProps)).catch((err) => {
      setSubmitting(false);
      setError(formatAxiosError(err));
    });
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>): void {
    const { value, name } = event.currentTarget;

    setFormProps({
      ...formProps,
      [name]: value,
    });
  }

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col sm={6} style={{ marginTop: 100 }}>
          <div className="text-center">
            <img
              style={{ maxWidth: 250, marginBottom: "2rem" }}
              src="/assets/images/logo.png"
              alt="logo"
              className="img-fluid"
            />
          </div>
          <div
            style={{
              boxShadow:
                "0 0 1px rgb(0 0 0 / 5%), 0 20px 45px -10px rgb(0 0 0 / 10%)",
              background: "#fff",
              borderRadius: 5,
              padding: "2rem",
            }}
          >
            {error && <Alert variant="danger">{error}</Alert>}
            <Form
              submitting={submitting}
              btnTitle="Login"
              onSubmit={handleSubmit}
            >
              <TextInput
                onChange={handleChange}
                label="Email"
                type="email"
                name="email"
                value={formProps.email}
                placeholder="Email"
                required
              ></TextInput>

              <TextInput
                onChange={handleChange}
                label="Password"
                type="password"
                name="password"
                value={formProps.password}
                placeholder="Password"
                required
              ></TextInput>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
