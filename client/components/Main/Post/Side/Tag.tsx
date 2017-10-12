import * as React from 'react'
import { tagList } from '../'
import { Add, Container, Form, Input } from './Styles'
import Card from './Card'

export interface Props {
  tagList: tagList,
  _onTagAdd: Function,
  _onTagRemove: Function,
}

export interface State {
  value: string,
  error: string
}

class LocalContainer extends React.Component<Props, State> {
  onTagAdd: Function
  onTagRemove: Function

  state: State = {
    value: 'fill me with love...',
    error: '',
  }

  constructor(props: Props) {
    super(props)

    this.onTagAdd = this.validate(
      this.props._onTagAdd(
        () => this.setState(() => ({value: ''}))
      )
    )
    this.onTagRemove = this.props._onTagRemove()
  }

  validate = (fn: Function) =>
    (e: any) => {
      const { tagList } = this.props
      let { value } = this.state

      value = value.trim()
      return value.length === 0 ?
        this.onError("YOU'RE TOO SHORT") : // extract error
        tagList.has(value) ?
          this.onError('TAG ALREADY EXISTS') :
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

  createTags = () => {
    const tagList = []

    for (const tagName of this.props.tagList) {
      const tag = <Card
        key={tagName}
        tagName={tagName}
        _onClick={this.onTagRemove}
      />

      tagList.push(tag)
    }

    return tagList
  }

  render() {

    return (
      <Form onSubmit={(e: any) => e.preventDefault()}>
        If you want to, you can add tags...
        <Input
          value={this.state.value}
          onChange={this.onChange}
        />
        <Add onClick={() => this.onTagAdd()}>
          <span>Attach tag</span>
        </Add>
        {this.createTags()}
      </Form>
    )
  }
}

export default LocalContainer
