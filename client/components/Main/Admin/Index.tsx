import * as React from 'react' // list posted articles and be able to edit the articles
import { connect } from 'react-redux'
import { Main } from './Styles'
import { RootState } from '../../../reducers'
import { selectArticle } from '../../../reducers/selector'
import Body from './Body'
import Side from './Side'

export interface PropState {
  articles: any
}

export interface Props extends PropState {
  userId: string
}

export interface State {
  selected?: object, // show meta data of selected data?
  query?: any, //[alphabetical, lastUpdate, dateCreated, status]
}

class LocalContainer extends React.Component<Props, State> {
  state: State = {
    selected: undefined,
    query: undefined
  }


  render () {
    const { selected, query } = this.state
    const { articles } = this.props

    return (
      <Main>
        <Side />
        <Body
          data={Array.from(articles.values())}
          query={query}
        />
      </Main>
    )
  }
}

const mapStateToProps = (state: RootState): PropState => {

  return {
    articles: selectArticle(state)
  }
}

export default connect<any, any, any>(mapStateToProps)(LocalContainer)

