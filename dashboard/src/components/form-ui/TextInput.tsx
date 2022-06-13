import React from "react";
import { Form } from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const TextInput = ({
  handleChange,
  label,
  ...otherProps
}: any): JSX.Element => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        onChange={handleChange}
        autoComplete="off"
        {...otherProps}
      />
    </Form.Group>
  );
};
