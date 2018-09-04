import React from "react"
import { FormStateManager } from "./form-manager"

export class FormFactory {
  static create() {
    const FormContext = React.createContext({
      state: {},
      form: {}
    })

    class Form extends React.PureComponent {
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
            <FormContext.Provider value={state}>
              {children}
            </FormContext.Provider>
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
              isLoading: false,
              errorMessage: error.message,
              response: error.response
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
    return Form
  }
}

export default class Form extends React.Component {
  state = { isLoading: false, errorMessage: "" }
  form = new FormStateManager(this)
  render() {
    const { form, state, props, onSubmit } = this
    const { children } = props

    return (
      <form className="form" onSubmit={onSubmit}>
        {React.Children.map(children, child => {
          return React.cloneElement(child, {
            state,
            form
          })
        })}
      </form>
    )
  }
  onSubmit = async event => {
    event.preventDefault()
    const { onSubmit } = this.props
    let { values, allValid } = await this.form.validateFields()
    if (allValid) {
      this.setState({ isLoading: true, errorMessage: "" })
      try {
        let response = await onSubmit(values)
        // do something
        console.log(response)
        this.setState({ isLoading: false, response })
      } catch (error) {
        console.log(error)
        this.setState({
          isLoading: false,
          errorMessage: error.message,
          response: error.response
        })
      }
    }
  }
  static Button = ButtonSection
  static Error = ErrorSection
  static Field = FormField
}

export function ErrorSection({ state }) {
  const { errorMessage } = state
  return (
    errorMessage && <div className="form__error-message">{errorMessage}</div>
  )
}

export function ButtonSection({ state }) {
  const { isLoading } = state
  return (
    <button className="form__submit-btn" disabled={isLoading}>
      {isLoading ? "Loading..." : "Submit"}
    </button>
  )
}

export function FormField({ name, label, form, children }) {
  const inputNode = React.Children.only(children)
  name = name || inputNode.props.name
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
}

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
  )
}

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
  )
}

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
  )
}
