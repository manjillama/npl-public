import React, { SyntheticEvent } from "react";
import { REST_ROOM_TYPE } from "../../../constants";
import { IRestroomType } from "../../../interfaces";
import {
  TextArea,
  TextInput,
  Checkbox,
  SelectInput,
  Form,
} from "../../form-ui";

interface Props {
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: (e: SyntheticEvent) => void;
  submitting: boolean;
  formProps: IRestroomType;
}

const RestroomForm = (props: Props): JSX.Element => {
  const { onSubmit, handleChange, submitting, formProps } = props;
  const {
    name,
    location: { coordinates },
    isEnabled,
    address,
    phoneNumber,
    type,
    remarks,
  } = formProps;
  return (
    <Form submitting={submitting} onSubmit={onSubmit}>
      <div className="mb-3">
        <Checkbox
          onChange={handleChange}
          label="Enabled"
          name="isEnabled"
          type="checkbox"
          checked={isEnabled}
        ></Checkbox>
      </div>
      <TextInput
        onChange={handleChange}
        label="Name"
        type="text"
        name="name"
        value={name}
        placeholder="Name"
        required
      ></TextInput>
      <TextInput
        onChange={handleChange}
        label="Address"
        type="text"
        name="address"
        value={address}
        placeholder="Address"
        required
      ></TextInput>
      <TextInput
        onChange={handleChange}
        label="Phone number"
        type="text"
        name="phoneNumber"
        value={phoneNumber}
        placeholder="Phone number"
        required
      ></TextInput>
      <SelectInput
        onChange={handleChange}
        label="Type"
        type="text"
        name="type"
        options={REST_ROOM_TYPE.map((v) => ({ value: v, label: v }))}
        value={type}
        required
      />
      <TextInput
        onChange={handleChange}
        label="Latitude"
        type="text"
        name="lat"
        value={coordinates[1]}
        placeholder="Latitude"
        required
      ></TextInput>
      <TextInput
        onChange={handleChange}
        label="Longitude"
        type="text"
        name="lng"
        value={coordinates[0]}
        placeholder="Longitude"
        required
      ></TextInput>
      <TextArea
        onChange={handleChange}
        label="Remarks"
        type="text"
        name="remarks"
        value={remarks}
        placeholder="Remarks"
        required
      ></TextArea>
    </Form>
  );
};

export default RestroomForm;
