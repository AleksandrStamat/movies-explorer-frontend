import React, { useCallback } from "react";

export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const validEmail = (target, name, value) => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const error = 'Некорректный e-mail';
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: (valid) ? "" : error });
    setIsValid((!valid) ? valid : target.closest("form").checkValidity());
  };

  const handleValid = (target, name, value) => {
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === 'email') {
      validEmail(target, name, value);
      return;
    }
    handleValid(target, name, value);
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm, setValues };
}