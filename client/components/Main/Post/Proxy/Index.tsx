import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fromApi, fromState, toState } from './util'
import { editorState, State as IndexState, tags, title } from '../'
import { fetchArticleId, fetchDraft, saveArticle } from '../../../../cms'
import { RootState } from '../../../../reducers'
import { articleDictionary } from '../../../../reducers/dictionary'
import { Dispatch } from '../../../../reducers/util'
import { selectArticle } from '../../../../reducers/selector'

export interface PropState {
  article? : any
}

export interface PropDispatch {
  fetch: Function
}

export interface Props extends PropState, PropDispatch {
  match: any,
  history: any
}

export interface State {
  ready: boolean
  content: any,
  status: boolean,
  tags: tags | undefined,
  title: title,
}

function Proxy (PostComponent: any) {
  class LocalContainer extends React.Component<Props, State> {
    state: State = {
      ready: true,
      content: undefined,
      status: false,
      tags: undefined,
      title: 'untitled',
    }

    targetId: string | undefined

    componentWillMount() {
      const { article } = this.props

      if (article) {
        this.targetId = article.id
        this.convertToState(article)
      }
    }

    convertToState = (article: any) => this.setState(() => toState(article))

    post = (state: IndexState) => {
      const article = fromState(state)

      this.targetId === undefined ?
        saveArticle(article)
          .then((res: any) => {
            const { fetch, history } = this.props

            this.targetId = res.data.id
            Promise.resolve(fetch(this.targetId))
              .then(() => history.push(`/post/${this.targetId}`))
          }) : // do some reducer action right here
        saveArticle(article, this.targetId)
    }

    render () {
      const { ready, content, status, tags, title } = this.state

      if (!ready) {
        return <span>IR not ready</span>
      }

      return <PostComponent
        content={content}
        status={status}
        tags={tags}
        title={title}
        post={this.post}
      />
    }
  }

  const mapStateToProps = (state: RootState, props: Props): PropState => {
    const { id } = props.match.params
    const article = selectArticle(state).get(id)

    return article === undefined ?
      {} :
      { article: article.data }
  }

  const mapDispatchToProps = (dispatch: Dispatch, props: Props): PropDispatch => ({
    fetch: (id: number | string) => dispatch(articleDictionary.set(id, fetchArticleId(id)))
  })

  return withRouter(connect<any, any, any>(mapStateToProps, mapDispatchToProps)(LocalContainer))
}

export default Proxy
