import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fromApi, fromState, toState } from './util'
import { editorState, State as IndexState, tags, title } from '../'
import { RootState } from 'Reducer'
import { articleDictionary } from 'Reducer/dictionary'
import { selectArticle } from 'Reducer/selector'
import { Dispatch } from 'Util/reducer'
import { fetchArticleId, fetchDraft, saveArticle } from 'Util/server'
import Branch from './Branch'

export interface PropDispatch {
  fetch: Function
}

export interface Props extends PropDispatch {
  match: any,
  history: any,
  payload?: any,
}

export interface State {
  content: any,
  status: boolean,
  tags: tags | undefined,
  title: title,
}

function Proxy (PostComponent: any) {
  class LocalContainer extends React.Component<Props, State> {
    state: State = { // initialState
      content: undefined,
      status: false,
      tags: undefined,
      title: 'untitled',
    }

    targetId: string | undefined = this.props.match.params.id

    componentWillMount() {
      const { payload } = this.props

      payload && this.convertToState(payload)
    }

    shouldComponentUpdate() {
      return false // temporarily
    }

    convertToState = (article: any) => this.setState(() => toState(article))

    save = (article: any, id?: number | string) =>
      saveArticle(article, id)
        .then((res: any) => this.props.cache(res.data) && res)

    onUpdate = (state: IndexState) => {
      const article = fromState(state)

      this.targetId === undefined ?
        this.save(article)
          .then((res: any) => {
            this.targetId = res.data.id
            this.props.history.push(`/post/${this.targetId}`)
          }) :
        this.save(article, this.targetId)
    }

    render () {
      const { content, status, tags, title } = this.state

      return <PostComponent
        content={content}
        status={status}
        tags={tags}
        title={title}
        onUpdate={this.onUpdate}
      />
    }
  }

  const mapDispatchToProps = (dispatch: Dispatch, props: Props): PropDispatch => ({
    cache: (article: any) => dispatch(articleDictionary.set(article))
  })

  return withRouter(connect<any, any, any>(null, mapDispatchToProps)(LocalContainer))
}

export default Proxy
