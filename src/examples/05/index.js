import React from "react"
import { request } from "../../utils/backend"
import Form from "./Form"

class Page extends React.Component {
  // what about validation
  // what if someone wants to pass an onChange to an input
  // what if a field depends on another field
  // what about nested formGroups
  render() {
    return (
      <Form onSubmit={request}>
        <div className="row">
          <div className="col">
            <EmailField />
            <RatingField />
          </div>
          <div className="col">
            <TextAreaField />
          </div>
        </div>
        <Form.Error />
        <Form.Button />
      </Form>
    )
  }
}

const EmailField = () => (
  <Form.Field name="email" label="Email">
    <input type="email" />
  </Form.Field>
)

const RatingField = () => (
  <Form.Field name="rating" label="Rating">
    <input type="number" />
  </Form.Field>
)

const TextAreaField = () => (
  <Form.Field name="comment" label="Comment">
    <textarea rows="5" />
  </Form.Field>
)

export { Page }
