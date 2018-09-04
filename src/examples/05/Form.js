import React from "react"
import { FormStateManager } from "./form-manager"
import hoistStatics from "hoist-non-react-statics"

const FormContext = React.createContext({
  state: {},
  form: {}
})

export function withForm(Component) {
  const Wrapper = (props, ref) => {
    return (
      <FormContext.Consumer>
        {form => <Component {...props} ref={ref} form={form} />}
      </FormContext.Consumer>
    )
  }
  Wrapper.displayName = `withForm(${Component.displayName || Comment.name})`
  return hoistStatics(React.forwardRef(Wrapper), Comment)
}

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
        this.setState({
          state: { isLoading: false, errorMessage: "", response }
        })
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
  static Button = withForm(FormButton)
  static Error = withForm(FormError)
  static Field = withForm(Field)
}

function FormButton({
  form: {
    state: { isLoading }
  }
}) {
  return (
    <button className="form__submit-btn" disabled={isLoading}>
      {isLoading ? "Loading..." : "Submit"}
    </button>
  )
}

function FormError({
  form: {
    state: { errorMessage }
  }
}) {
  return (
    errorMessage && <div className="form__error-message">{errorMessage}</div>
  )
}

function Field({ name, label, render, children, form: { form }, ...props }) {
  const inputNode = React.Children.only(children)
  name = name || inputNode.props.name
  let inputProps = {
    name,
    value: form.getFieldValue(name),
    onChange: form.getFieldOnChange(name)
  }
  return (
    <div className="form-field">
      <label className="form-field__label-container">
        <div className="form-field__label-text">{label}</div>
        <div className="form-field__input-container">
          {render
            ? render({ form, inputProps })
            : React.cloneElement(inputNode, inputProps)}
        </div>
      </label>
      <div className="form-field__error-message">
        {form.getFieldError(name)}
      </div>
    </div>
  )
}
