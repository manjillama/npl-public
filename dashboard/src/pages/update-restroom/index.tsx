import React, { SyntheticEvent, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import api from "../../api";
import { withDashboard } from "../../hoc";
import Loader from "../../components/commons/Loader";
import { Alert, Col, Row } from "react-bootstrap";
import { IRestroomType } from "../../interfaces";
import RestroomForm from "../../components/forms/restroom-form";

const UpdateRestroom = (): JSX.Element => {
  const [formProps, setFormProps] = useState<IRestroomType>({
    name: "",
    type: "Government",
    phoneNumber: "",
    address: "",
    location: {
      coordinates: [0, 0],
    },
    isEnabled: true,
    remarks: "",
  });
  const [fetching, setFetching] = useState(true);
  const [fetchError, setFetchError] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    api
      .get(`/restrooms/${id}`)
      .then((response: AxiosResponse) => {
        setFormProps(response.data.data.restroom);
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
      .patch(`/restrooms/${id}`, formProps)
      .then((response: AxiosResponse) => {
        setSubmitting(false);
        navigate(`/restrooms/${response.data.data.restroom.id}`);
      })
      .catch((error) => {
        setSubmitting(false);
        setError(error.response.data.message);
      });
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, type, checked } = event.currentTarget;
    let { value } = event.currentTarget;
    if (type === "checkbox") value = checked as any;
    else {
      if (name === "lat")
        return setFormProps({
          ...formProps,
          location: {
            coordinates: [formProps.location.coordinates[0], Number(value)],
          },
        });

      if (name === "lng")
        return setFormProps({
          ...formProps,
          location: {
            coordinates: [Number(value), formProps.location.coordinates[1]],
          },
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
              <h1 className="page-title">Update restroom</h1>
            </div>
            <div className="head-right"></div>
          </div>
        </Col>
      </Row>
      <div className="body-card">
        {error && <Alert variant="danger">{error}</Alert>}
        <RestroomForm
          submitting={submitting}
          onSubmit={onSubmit}
          handleChange={handleChange}
          formProps={formProps}
        ></RestroomForm>
      </div>
    </div>
  );
};

export default withDashboard(UpdateRestroom);
