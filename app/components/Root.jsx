import React, {Component} from 'react'
import { connect } from 'react-redux'

const Root = () =>
  <div id="root">
    <h1>ITS THE ROOT</h1>
  </div>

class LocalContainer extends Component {
  constructor() {
    super()
  }

  render() {
    return <Root />
  }
}

export default LocalContainer
