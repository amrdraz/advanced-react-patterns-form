import React from "react";

class Page extends React.Component {
  // 👉give an overview of the logic
  // 👉move fields logic to seperate class
  fields = {};
  state = { isLoading: false, errorMessage: "" };
  render() {
    const { onSubmit, getFieldOnChange, getFieldValue, getFieldError } = this;
    const { isLoading, errorMessage } = this.state;
    // 👉create form component
    // 👉create component for each field as well as error, and button section
    return (
      <form className="form" onSubmit={onSubmit}>
        <div className="form-field">
          <label className="form-field__label-container">
            <div className="form-field__label-text">email</div>
            <div className="form-field__input-container">
              <input
                name="email"
                value={getFieldValue("email")}
                onChange={getFieldOnChange("email")}
                type="email"
              />
            </div>
          </label>
          <div className="form-field__error-message">
            {getFieldError("email")}
          </div>
        </div>
        <div className="form-field">
          <label className="form-field__label-container">
            <div className="form-field__label-text">rating</div>
            <div className="form-field__input-container">
              <input
                name="rating"
                value={getFieldValue("rating")}
                onChange={getFieldOnChange("rating")}
                type="number"
              />
            </div>
          </label>
          <div className="form-field-error-message">
            {getFieldError("rating")}
          </div>
        </div>
        <div className="form-field">
          <label className="form-field__label-container">
            <div className="form-field__label-text">comment</div>
            <div className="form-field__input-container">
              <textarea
                name="comment"
                value={getFieldValue("comment")}
                onChange={getFieldOnChange("comment")}
                rows="4"
              />
            </div>
          </label>
          <div className="form-field__error-message">
            {getFieldError("comment")}
          </div>
        </div>
        {errorMessage && (
          <div className="form__error-message">{errorMessage}</div>
        )}
        <button className="form__submit-btn" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    );
  }
  onSubmit = async event => {
    event.preventDefault();
    let { values, allValid } = await this.validateFields();
    if (allValid) {
      this.setState({ isLoading: true, errorMessage: "" });
      try {
        let response = await request(values);
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
  validateFields() {
    let values = this.getFieldsValue();
    return { values, allValid: true };
  }
  getFieldOnChange = name => e => {
    let value = e.target.value;
    this.setFieldValue(name, value);
    this.setState({ fields: this.fields });
  };
  getField = name => {
    this.fields[name] = this.fields[name] || {};
    return this.fields[name];
  };
  getFieldError = name => {
    return this.getField(name).error;
  };
  getFieldValue = name => {
    return this.getField(name).value;
  };
  getFieldsValue() {
    return Object.entries(this.fields).reduce(
      (values, [name, { value }]) => ({ ...values, [name]: value }),
      {}
    );
  }
  setFieldValue = (name, value) => {
    this.setFieldsValue({ [name]: value });
  };
  setFieldsValue = values => {
    this.fields = {
      ...this.fields,
      ...Object.entries(values).reduce(
        (values, [name, value]) => ({
          ...values,
          [name]: { ...this.getField(name), value }
        }),
        {}
      )
    };
  };
}

async function request(data) {
  return new Promise((res, rej) => {
    if (data.comment === "reject") {
      return rej({ message: "you failed", response: { status: 400 } });
    }
    setTimeout(res, 1000, { id: Date.now(), ...data });
  });
}

export { Page };
