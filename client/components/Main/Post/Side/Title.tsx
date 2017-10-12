import * as React from 'react'
import { tagList } from '../'
import { Add, Container, Form, Input } from './Styles'
import Card from './Card'

export interface Props {
  title: string,
  onTitle: Function
}

export interface State {
  value: string,
  error: string
}

class LocalContainer extends React.Component<Props, State> {
  onTitle: Function

  state: State = {
    value: 'untitled',
    error: '',
  }

  constructor(props: Props) {
    super(props)

    this.onTitle = this.validate(this.props.onTitle)
  }

  validate = (fn: Function) =>
    (e: any) => {
      let { value } = this.state

      value = value.trim()
      return value.length === 0 ?
        this.onError("YOU'RE TOO SHORT") : // extract error
          fn(value)
    }

  onError = (error: string) => {
    this.state.error || this.setState(
      ({value}) => ({value, error}),
      () => setTimeout(() => this.setState(() => ({error: ''})), 1000)
    )
  }

  onChange = (e: any) => {
    const { value } = e.target

    this.setState(() => ({value}))
  }


  render() {
    const { value } = this.state

    return (
      <Form onSubmit={(e: any) => e.preventDefault()}>
        Make your title...
        <Input
          value={value}
          onChange={this.onChange}
        />
        <Add onClick={() => this.onTitle()}>
          <span>Save title</span>
        </Add>
      </Form>
    )
  }
}

export default LocalContainer
