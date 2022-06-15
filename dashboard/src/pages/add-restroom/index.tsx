import React, { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import RestroomForm from "../../components/forms/restroom-form";
import { withDashboard } from "../../hoc";
import { AxiosResponse } from "axios";
import { IRestroomType } from "../../interfaces";

const AddRestroom = (): JSX.Element => {
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
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    setSubmitting(true);

    api
      .post("/restrooms", formProps)
      .then((response: AxiosResponse) => {
        setSubmitting(false);
        navigate(`/restrooms/${response.data.data.restroom.id}`);
      })
      .catch(() => {
        setSubmitting(false);
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

  return (
    <div className="container">
      <div className="head-panel d-flex">
        <div className="head-left">
          <h1 className="page-title">Add restroom</h1>
        </div>
        <div className="head-right"></div>
      </div>
      <div className="body-card">
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

export default withDashboard(AddRestroom);
