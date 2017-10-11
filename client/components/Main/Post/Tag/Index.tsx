import * as React from 'react'
import { Add, Container, Form, Input } from './Styles'
import Card from './Card'

export interface Props {

}

export interface State {
  added: Set<string>,
  value: string,
  error: string
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    added: new Set(),
    value: 'fill me with love...',
    error: '',
  }

  validateTag = (fn: Function) =>
    (e: any) => {
      let { added, value } = this.state
      value = value.trim()

      return value.length === 0 ?
        this.onError("YOU'RE TOO SHORT") :
        added.has(value) ?
          this.onError('TAG ALREADY EXISTS') :
          fn(value)
    }

  onError = (error: string) => {
    this.state.error || this.setState(
      ({added, value}) => ({added, value, error}),
      () => setTimeout(() => this.setState(() => ({error: ''})), 1000)
    )
  }

  onChange = (e: any) => {
    const { value } = e.target

    this.setState(() => ({value}))
  }

  onTagRemove = (tagName: string) => {
    const { added } = this.state

    added.delete(tagName) && this.setState(() => ({added}))
  }

  onTagAdd = this.validateTag((tagName: string) => {
    this.setState(({added}) => ({added: new Set(added.add(tagName)), value: ''}))
  })

  onSubmit = (e: any) => {
    e.preventDefault()
  }

  createTags = () => {
    const tagList = []

    for (const tagName of this.state.added) {
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
      <Container>
        If you want to, you can add tags...
        <Form onSubmit={this.onSubmit}>
          <Input
            value={this.state.value}
            onChange={this.onChange}
          />
          <Add onClick={this.onTagAdd}>
            <span>ADD THAT TAG</span>
          </Add>
        </Form>
        {this.createTags()}
      </Container>
    )
  }
}

export default LocalContainer
