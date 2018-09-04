import React from "react";
import { request } from "../../utils/backend";
import BaseForm from "./Form";

class Form extends BaseForm {
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
}

class Page extends React.Component {
  render() {
    return (
      <Form onSubmit={request}>
        <Form.Field name="email" label="Email">
          <input type="email" />
        </Form.Field>
        <Form.Field name="rating" label="Rating">
          <input type="number" />
        </Form.Field>
        <Form.Field name="comment" label="Comment">
          <textarea rows="4" />
        </Form.Field>
        <Form.Error />
        <Form.Button />
      </Form>
    );
  }
}

export { Page };
