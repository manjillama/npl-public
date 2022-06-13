import React, { ChangeEvent } from "react";
import { Form } from "react-bootstrap";

interface Props {
  label?: string;
  name: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement>) => any;
  options: { value: string | number; label: string }[];
  [key: string]: any;
}
export const SelectInput = ({
  value,
  onChange,
  label,
  options,
  ...otherProps
}: Props): JSX.Element => (
  <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
    {label && <Form.Label>{label}</Form.Label>}
    <Form.Control as="select" value={value} onChange={onChange} {...otherProps}>
      {options.map((option) => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Control>
  </Form.Group>
);
