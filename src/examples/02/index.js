import React from "react";
import { request } from "../../utils/backend";
import { FormStateManager } from "./form-manager";
import {
  InputField,
  RatingField,
  TextAreaField,
  ButtonSection,
  ErrorSection
} from "./Form";

class Form extends React.Component {
  // 👉move the state and formState manager here
  render() {
    const { onSubmit, children } = this.props;
    // 👉 have Form pass state and form to it's children
    // lookup https://reactjs.org/docs/react-api.html#reactchildren
    // use React.Children.map and React.cloneElement
    return (
      <form className="form" onSubmit={onSubmit}>
        {children}
      </form>
    );
  }
  // 👉move the handler for common submission cases
  // 👉create compound components since they practically don't work without Form
  // 👉 create Field Component for common case using also children.map
}

class Page extends React.Component {
  state = { isLoading: false, errorMessage: "" };
  form = new FormStateManager(this);
  render() {
    const { onSubmit, form, state } = this;
    return (
      <Form onSubmit={onSubmit}>
        <InputField label="Email" name="email" form={form} type="email" />
        <RatingField label="Rating" name="rating" form={form} />
        <TextAreaField label="Comment" name="comment" form={form} rows="4" />
        <ErrorSection state={state} />
        <ButtonSection state={state} />
      </Form>
    );
  }
  onSubmit = async event => {
    event.preventDefault();
    let { values, allValid } = await this.form.validateFields();
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
}

export { Page };
