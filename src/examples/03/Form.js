import React from "react";
import { FormStateManager } from "./form-manager";

export default class Form extends React.Component {
  state = { isLoading: false, errorMessage: "" };
  form = new FormStateManager(this);
  render() {
    const { form, state, props, onSubmit } = this;
    const { children } = props;

    return (
      <form className="form" onSubmit={onSubmit}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            state,
            form
          });
        })}
      </form>
    );
  }
  onSubmit = async event => {
    event.preventDefault();
    const { onSubmit } = this.props;
    let { values, allValid } = await this.form.validateFields();
    if (allValid) {
      this.setState({ isLoading: true, errorMessage: "" });
      try {
        let response = await onSubmit(values);
        // do something
        console.log(response);
        this.setState({ isLoading: false, response });
      } catch (error) {
        console.log(error);
        this.setState({
          isLoading: false,
          errorMessage: error.message,
          response: error.response
        });
      }
    }
  };
  static Button = ButtonSection;
  static Error = ErrorSection;
  static Field = FormField;
}

export function ErrorSection({ state }) {
  const { errorMessage } = state;
  return (
    errorMessage && <div className="form__error-message">{errorMessage}</div>
  );
}

export function ButtonSection({ state }) {
  const { isLoading } = state;
  return (
    <button className="form__submit-btn" disabled={isLoading}>
      {isLoading ? "Loading..." : "Submit"}
    </button>
  );
}

export function FormField({ name, label, form, children }) {
  const inputNode = React.Children.only(children);
  name = name || inputNode.props.name;
  return (
    <div className="form-field">
      <label className="form-field__label-container">
        <div className="form-field__label-text">{label}</div>
        <div className="form-field__input-container">
          {React.cloneElement(inputNode, {
            name,
            value: form.getFieldValue(name),
            onChange: form.getFieldOnChange(name)
          })}
        </div>
      </label>
      <div className="form-field__error-message">
        {form.getFieldError(name)}
      </div>
    </div>
  );
}
