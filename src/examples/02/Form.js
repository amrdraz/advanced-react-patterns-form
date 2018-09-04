import React from "react";

export const ErrorSection = ({ state }) => {
  const { errorMessage } = state;
  return (
    errorMessage && <div className="form__error-message">{errorMessage}</div>
  );
};

export const ButtonSection = ({ state }) => {
  const { isLoading } = state;
  return (
    <button className="form__submit-btn" disabled={isLoading}>
      {isLoading ? "Loading..." : "Submit"}
    </button>
  );
};

export const InputField = ({ label, name, form, ...props }) => {
  return (
    <div className="form-field">
      <label className="form-field__label-container">
        <div className="form-field__label-text">{label}</div>
        <div className="form-field__input-container">
          <input
            name={name}
            value={form.getFieldValue(name)}
            onChange={form.getFieldOnChange(name)}
            {...props}
          />
        </div>
      </label>
      <div className="form-field__error-message">
        {form.getFieldError(name)}
      </div>
    </div>
  );
};

export const RatingField = ({ label, name, form }) => {
  return (
    <div className="form-field">
      <label className="form-field__label-container">
        <div className="form-field__label-text">{label}</div>
        <div className="form-field__input-container">
          <input
            name={name}
            value={form.getFieldValue(name)}
            onChange={form.getFieldOnChange(name)}
            type="number"
          />
        </div>
      </label>
      <div className="form-field__error-message">
        {form.getFieldError(name)}
      </div>
    </div>
  );
};

export const TextAreaField = ({ label, name, form, ...props }) => {
  return (
    <div className="form-field">
      <label className="form-field__label-container">
        <div className="form-field__label-text">{label}</div>
        <div className="form-field__input-container">
          <textarea
            name={name}
            value={form.getFieldValue(name)}
            onChange={form.getFieldOnChange(name)}
            {...props}
          />
        </div>
      </label>
      <div className="form-field__error-message">
        {form.getFieldError(name)}
      </div>
    </div>
  );
};
