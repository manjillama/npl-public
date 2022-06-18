import React, { SyntheticEvent, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Checkbox, Form, TextInput } from "../../form-ui";
import { ROLES } from "../../../constants";
import { IStaff } from "../../../interfaces";
import StaffRoleInfoModal from "./StaffRoleInfoModal";

interface Props {
  isEdit?: boolean;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onSubmit: (e: SyntheticEvent) => void;
  submitting: boolean;
  formProps: IStaff;
}

const allRoles = Object.values(ROLES);

const StaffForm = (props: Props): JSX.Element => {
  const [showStaffRoleModal, setShowStaffRoleModal] = useState(false);

  const { onSubmit, handleChange, submitting, formProps, isEdit } = props;
  const { name, email, password, phoneNumber, roles } = formProps;
  return (
    <>
      <Form submitting={submitting} onSubmit={onSubmit}>
        <TextInput
          onChange={handleChange}
          label="Full name"
          type="text"
          name="name"
          value={name}
          placeholder="Full name"
          required
        ></TextInput>

        <TextInput
          onChange={handleChange}
          label="Email"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          required
        ></TextInput>

        {!isEdit && (
          <TextInput
            onChange={handleChange}
            label="Password"
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            required
          ></TextInput>
        )}

        <TextInput
          onChange={handleChange}
          label="Phone number"
          type="text"
          name="phoneNumber"
          value={phoneNumber}
          placeholder="Phone number"
          required
        ></TextInput>

        <label>
          Roles{" "}
          <button
            type="button"
            style={{ padding: 0 }}
            className="btn"
            onClick={() => setShowStaffRoleModal(true)}
          >
            <AiOutlineInfoCircle />
          </button>
        </label>
        <div className="mb-3">
          {allRoles.map((t) => (
            <Checkbox
              key={t}
              inline
              name="roles"
              type="checkbox"
              label={t?.split("ROLE_")[1]}
              value={t}
              checked={roles?.includes(t)}
              onChange={handleChange}
            />
          ))}
        </div>
      </Form>
      <StaffRoleInfoModal
        showStaffRoleModal={showStaffRoleModal}
        setShowStaffRoleModal={setShowStaffRoleModal}
      />
    </>
  );
};

export default StaffForm;
