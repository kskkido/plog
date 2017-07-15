import React, {Component} from 'react'
import { connect } from 'react-redux'

const Main = () => (
  <div id="Main">
    <h1>ITS THE Main</h1>
  </div>
)

class LocalContainer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <Main />
  }
}

const mapStateToProps = (state) => ({})
const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(LocalContainer)
