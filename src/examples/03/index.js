import React from "react";
import { request } from "../../utils/backend";
import BaseForm from "./Form";

// create context here, then move it into the manager

class Form extends BaseForm {
  render() {
    const { form, state, props, onSubmit } = this;
    const { children } = props;

    // 👉create a 2 column layout form
    // you can use form--vertical for have the fields take a column direction
    // 👉switch to using render prop if a function is passed
    // 👉stop using react.Children in favor of the context API
    // 👉refactor sub components to use the manager's context
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
          <textarea rows="5" />
        </Form.Field>
        <Form.Error />
        <Form.Button />
      </Form>
    );
  }
}

export { Page };
