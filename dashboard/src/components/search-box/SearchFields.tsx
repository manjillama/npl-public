import React, { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

interface Props {
  fields: {
    label: string;
    name: string;
    type?: "text" | "dropDown" | "date";
    options?: { label: string; value: any }[];
  }[];
}

export function SearchFields({ fields }: Props): JSX.Element {
  const [searchParams] = useSearchParams();

  const defaultFormProps: any = {};
  fields.forEach(
    ({ name }) =>
      (defaultFormProps[name] = searchParams.get(name)
        ? searchParams.get(name)
        : "")
  );

  const [formProps, setFormProps] = useState(defaultFormProps);
  const { pathname } = useLocation();

  function handleOnChange(event: React.FormEvent<HTMLInputElement>) {
    const { name, value } = event.currentTarget;
    setFormProps({ ...formProps, [name]: value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const queryParams = Object.entries(formProps)
      .filter(([, value]) => value !== "" && value !== "All")
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    window.location.href = `${pathname}?${queryParams}`;
  }

  function renderSearchInputField({
    field: { label, name, type = "text", options },
  }: {
    field: typeof fields[0];
  }) {
    if (type === "dropDown")
      return (
        <select
          onChange={handleOnChange as any}
          name={name}
          value={formProps[name]}
          style={{ marginRight: 8 }}
          className="form-control"
        >
          {options?.map(({ value, label }) => (
            <option key={label} value={value}>
              {label}
            </option>
          ))}
        </select>
      );
    return (
      <input
        type={type}
        style={{ marginRight: 8 }}
        key={name}
        name={name}
        onChange={handleOnChange}
        value={formProps[name]}
        className="form-control"
        placeholder={label}
        autoComplete="off"
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <div className="d-flex">
          {fields.map((field) => (
            <div key={field.label} style={{ width: "100%", marginRight: 8 }}>
              <label>{field.label}</label>
              {renderSearchInputField({ field })}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              alignItems: "end",
            }}
          >
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
