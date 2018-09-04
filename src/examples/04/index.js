import React from "react"
import { request } from "../../utils/backend"
import Form from "./Form"

// 👉 create a higher order component withFormField that wraps a form field
// <Form.Field name="email" label="Email">
//   <StarRating />
// </Form.Field >
// becomes somthing like
// const EmailField = withFormField(({ state, form }) => <input type="email">)
class Page extends React.Component {
  //  👉 create wrapped FormFiled for the input rating and textarea fields
  render() {
    return (
      <Form onSubmit={request}>
        <div className="row">
          <div className="col">
            <Form.Field name="email" label="Email">
              <input type="email" />
            </Form.Field>
            <Form.Field name="rating" label="Rating">
              <input type="number" />
            </Form.Field>
          </div>
          <div className="col">
            <Form.Field name="comment" label="Comment">
              <textarea rows="5" />
            </Form.Field>
          </div>
        </div>
        <Form.Error />
        <Form.Button />
      </Form>
    )
  }
}

export { Page }
