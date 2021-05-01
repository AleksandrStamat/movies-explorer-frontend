import React from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import Form, { Field, Submit } from "../Form/Form";
import "./Section.css";

function Section({
  title,
  name,
  validators,
  defaultValues,
  onlyDifferent,
  inputsList = [],
  submitText,
  footerData,
  onSubmit,
}) {
  const fieldList = inputsList.map((item) => (
    <Field key={`${name}-${item.name}`} name={item.name}>
      {({ isInvalid, errorMessage, ...inputProps }) => {
        return (
          <div className="section__field">
            <label htmlFor={item.name} className="section__label">
              {" "}
              {item.label}{" "}
            </label>
            <input
              className={`section__input ${
                isInvalid ? "section__input_error" : ""
              } `}
              {...inputProps}
              {...item}
            />
            <span
              className={`section__error ${
                isInvalid ? "section__error_visible" : ""
              } `}
            >
              {errorMessage || "Текст ошибки"}
            </span>
          </div>
        );
      }}
    </Field>
  ));
  return (
    <Form
      className="section"
      name={name}
      onSubmit={onSubmit}
      validators={validators}
      defaultValues={defaultValues}
      onlyDifferent={onlyDifferent}
      isOpen={true}
    >
      <Logo elementClass="section__logo" />
      <h2 className="section__title">{title}</h2>
      <fieldset className="section__fieldList">{fieldList}</fieldset>
      <Submit>
        {({ disabled }) => (
          <button
            className={`section__submit ${
              disabled ? "section__submit_disabled" : ""
            } `}
            type="submit"
            disabled={disabled}
          >
            {submitText}
          </button>
        )}
      </Submit>
      <div className="section__footer">
        <p className="section__description">{footerData.description}</p>
        <Link to={footerData.linkTo} className="section__link">
          {footerData.linkText}
        </Link>
      </div>
    </Form>
  );
}

export default Section;
