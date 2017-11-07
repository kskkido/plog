import * as React from 'react'
import { tags } from '../'
import { Add, Container, Form, Input } from './Styles'
import Card from './Card'

export interface Props {
  tags: tags,
  onTag: Function
}

export interface State {
  value: string,
  error: string
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    value: 'fill me with love...',
    error: ''
  }

  onTagAdd = (tagName: string) => tagName.length > 1 &&
    this.props.onTag((tags: tags) =>
      new Set(tags.add(tagName))
    , () => this.setState(() => ({value: ''}))
    )

  onTagRemove = (tagName: string) =>
    this.props.onTag((tags: tags) =>
      tags.delete(tagName) && new Set(tags)
    )

  onChange = (e: any) => {
    const { value } = e.target

    this.setState(() => ({value}))
  }

  createTags = function * (tags: tags){
    for (const tagName of tags) {
      const card = <Card
        key={tagName}
        tagName={tagName}
        _onClick={() => this.onTagRemove(tagName)}
      />

      yield card
    }
  }

  render() {

    return (
      <Form onSubmit={(e: any) => e.preventDefault()}>
        If you want to, you can add tags...
        <Input
          value={this.state.value}
          onChange={this.onChange}
        />
        <Add onClick={() => this.onTagAdd(this.state.value.toUpperCase())}>
          <span>Attach tag</span>
        </Add>
        {Array.from(this.createTags(this.props.tags))}
      </Form>
    )
  }
}

export default LocalContainer
