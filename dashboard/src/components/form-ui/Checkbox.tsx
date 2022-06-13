import React, { FormEvent } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  label?: string;
  inline?: boolean;
  name: string;
  type: any;
  checked?: boolean;
  onChange: (e: FormEvent<HTMLInputElement>) => any;
  [key: string]: any;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Checkbox = ({ label, ...otherProps }: Props): JSX.Element => {
  return <Form.Check label={label} id={`inline-${label}`} {...otherProps} />;
};
