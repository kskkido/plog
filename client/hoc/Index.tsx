import * as React from 'react'

export interface Props {
  publisher: any,
  event: any
}

export interface State {
  response: any
}

class Subscriber extends React.Component<Props, State> {
  state: State = {
    response: undefined
  }

  componentWillMount() {
    const { event, publisher } = this.props.publisher
  }
}
