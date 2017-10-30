import * as React from 'react'
import { Add, Container, Form, Input } from './Styles'
import Card from './Card'

export interface Props {
  value: string,
  onTitle: Function
}

export interface State {
  error: string
}

class LocalContainer extends React.Component<Props, State> {
  onChange: Function

  constructor(props: Props) {
    super(props)

    this.state = {
      error: ''
    }

    this.onChange = this.validate(this.props.onTitle)
  }

  validate = (fn: Function) =>
    (e: any) => {
      let { value } = e.target

      fn(value)
    }

  onError = (error: string) => {
    this.state.error || this.setState(
      () => ({error}),
      () => setTimeout(() => this.setState(() => ({error: ''})), 1000)
    )
  }

  render() {
    const { value } = this.props

    return (
      <Form onSubmit={(e: any) => e.preventDefault()}>
        Make your title...
        <Input
          value={value}
          onChange={(e: any) => this.onChange(e)}
        />
      </Form>
    )
  }
}

export default LocalContainer
