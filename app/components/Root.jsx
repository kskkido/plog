import React, {Component} from 'react'
import { connect } from 'react-redux'

const Root = () => (
  <div id="root">
    <h1>ITS THE ROOT</h1>
  </div>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Root />
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
