import * as React from 'react'
import { connect } from 'react-redux'
import { convertFromRaw, convertToRaw } from 'draft-js'
import  { stateToHTML } from 'draft-js-export-html'
import { editorState, tagList, title } from './'
import { postArticle, fetchDraft, postDraft } from '../../../cms'
import { RootState } from '../../../reducers'
import { selectArticleByKey } from '../../../reducers/selector'

export interface Props {
  article?: any,
  match?: object
}

export interface State {
  ready: boolean
  editorState: editorState | null,
  tagList: tagList | null,
  title: title,
}

function Proxy (PostComponent: any) { //used to fetch and post to cache. Also checks whether the post component creates new or retrive from old
  const Wrapped = class LocalContainer extends React.Component {
    state: State = {
      ready: false,
      editorState: null,
      tagList: null,
      title: 'untitled',
    }

    componentWillMount() {
      //use to post and fetch from cache
      this.cacheFetch()
        .then((res) => this.setState(() => res))
        .catch(console.error)
    }

    convertFromJson = (type: string, payload: any) => {
      switch(type) {
      case 'editorState':
        payload = convertFromRaw(payload)
        break;
      case ('tagList'):
        payload = new Set(payload)
      default:
        payload = payload
      }

      return payload
    }

    convertToJson = (type: string, payload: any) => {
      switch(type) {
      case 'editorState':
        payload = convertToRaw(payload.getCurrentContent())
        break;
      case 'html':
        payload = stateToHTML(payload.getCurrentContent())
        break;
      case 'tagList':
        payload = Array.from(payload)
        break;
      default:
        payload = payload
      }

      return payload
    }

    cacheFetch = () =>
      fetchDraft()
      .then(({data}) => {
        const types = Object.keys(data)

        return Object.assign({ready: true}, ...types.map((type) => {
          const payload = data[type]

          return payload === null || payload === undefined ?
            {[type]: payload} :
            {[type]: this.convertFromJson(type, payload)}
          }
        ))
      })
      .catch(console.error)

    cacheArticle = (updater: Function, type: string) => (data: any, cb?: Function) => {
      updater(type, data, cb)
      postDraft({type, payload: this.convertToJson(type, data)})
    }

    publishArticle = (state: {editorState: editorState, tagList: tagList, title: title}) => {
      const { editorState, tagList, title } = state

      postArticle({
        title: this.convertToJson('title', title) || 'untitled',
        content: this.convertToJson('html', editorState),
        tagList: this.convertToJson('tagList', tagList)
      })
    }

    render () {
      const { ready, editorState, tagList, title } = this.state
      console.log(this.props.article, 'PROPS')

      if (!ready) {
        return <span>IR not ready</span>
      }

      return <PostComponent
        editorState={editorState}
        tagList={tagList}
        title={title}
        cacheArticle={this.cacheArticle}
        publishArticle={this.publishArticle}
      />
    }
  }

  const mapStateToProps = (state: RootState, props: Props) => {
    const { id } = props.match.params
    const article = selectArticleByKey(state, id)

    return article === undefined ?
      {} :
      { article }
  }

  return connect<any, any, any>(mapStateToProps)(Wrapped)
}

export default Proxy
