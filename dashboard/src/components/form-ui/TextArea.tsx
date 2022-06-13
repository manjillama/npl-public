import React from "react";
import { Form } from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const TextArea = ({
  handleChange,
  rows,
  label,
  ...otherProps
}: any): JSX.Element => {
  return (
    <Form.Group className="mb-3">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        as="textarea"
        rows={rows ? rows : 3}
        onChange={handleChange}
        {...otherProps}
      />
    </Form.Group>
  );
};
