import React, { ReactNode, SyntheticEvent } from "react";
import { Form as BootstrapForm } from "react-bootstrap";

export * from "./TextInput";
export * from "./TextArea";
export * from "./Checkbox";
export * from "./SelectInput";

export const Form = ({
  btnTitle,
  onSubmit,
  submitting,
  children,
}: {
  btnTitle?: string;
  onSubmit: (e: SyntheticEvent) => void;
  submitting: boolean;
  children: ReactNode;
}): JSX.Element => (
  <BootstrapForm onSubmit={onSubmit}>
    {children}
    <button
      disabled={submitting}
      className="btn btn-primary"
      style={{ position: "relative", padding: ".5rem 2.5rem" }}
    >
      {submitting && (
        <div
          className="spi"
          style={{
            position: "absolute",
            height: 15,
            width: 15,
            top: 9,
            left: 9,
          }}
        />
      )}
      {btnTitle ?? "Save"}
    </button>
  </BootstrapForm>
);
