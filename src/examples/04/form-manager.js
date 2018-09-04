import React from "react"
import { EventEmitter } from "../../utils/event-emitter"

export class FormStateManager extends EventEmitter {
  fields = {}
  constructor(component) {
    super()
    this.component = component
    this.onFieldsChange(fields => component.setState({ fields }))
  }
  onFieldsChange(subscriber) {
    this.on("fields.change", subscriber)
  }
  async validateFields() {
    let values = this.getFieldsValue()
    return { values, allValid: true }
  }
  getFieldOnChange = name => e => {
    let value = e.target.value
    this.setFieldValue(name, value)
    this.emit("fields.change", this.fields)
  }
  getField = name => {
    this.fields[name] = this.fields[name] || {}
    return this.fields[name]
  }
  getFieldError = name => {
    return this.getField(name).error
  }
  getFieldValue = name => {
    return this.getField(name).value
  }
  getFieldsValue() {
    return Object.entries(this.fields).reduce(
      (values, [name, { value }]) => ({ ...values, [name]: value }),
      {}
    )
  }
  setFieldValue = (name, value) => {
    this.setFieldsValue({ [name]: value })
  }
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
    }
  }
}
