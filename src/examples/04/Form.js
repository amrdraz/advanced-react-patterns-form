import React from "react"
import { FormStateManager } from "./form-manager"

const FormContext = React.createContext({
  state: {},
  form: {}
})

export default class Form extends React.PureComponent {
  static Consumer = FormContext.Consumer
  state = {
    state: {
      isLoading: false,
      errorMessage: ""
    },
    form: new FormStateManager(this)
  }
  render() {
    const { state, props, onSubmit } = this
    const { children } = props
    const render =
      typeof children === "function" ? (
        children(state)
      ) : (
        <FormContext.Provider value={state}>{children}</FormContext.Provider>
      )
    return (
      <form className="form form--vertical" onSubmit={onSubmit}>
        {render}
      </form>
    )
  }
  onSubmit = async event => {
    event.preventDefault()
    const { onSubmit } = this.props
    let { values, allValid } = await this.state.form.validateFields()
    if (allValid) {
      this.setState({ state: { isLoading: true, errorMessage: "" } })
      try {
        let response = await onSubmit(values)
        // do something
        console.log(response)
        this.setState({ state: { isLoading: false, response } })
      } catch (error) {
        console.log(error)
        this.setState({
          state: {
            isLoading: false,
            errorMessage: error.message,
            response: error.response
          }
        })
      }
    }
  }
  static Button = () => (
    <FormContext.Consumer>
      {({ state: { isLoading } }) => {
        return (
          <button className="form__submit-btn" disabled={isLoading}>
            {isLoading ? "Loading..." : "Submit"}
          </button>
        )
      }}
    </FormContext.Consumer>
  )
  static Error = () => (
    <FormContext.Consumer>
      {({ state: { errorMessage } }) => {
        return (
          errorMessage && (
            <div className="form__error-message">{errorMessage}</div>
          )
        )
      }}
    </FormContext.Consumer>
  )
  static Field = ({ name, label, children }) => {
    const inputNode = React.Children.only(children)
    name = name || inputNode.props.name
    return (
      <FormContext.Consumer>
        {({ form }) => {
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
          )
        }}
      </FormContext.Consumer>
    )
  }
}
