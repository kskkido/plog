import * as React from 'react'
import { selectRelatedArticle } from 'Reducer/selector'
import { RootState } from 'Reducer'
import { callLeft } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { flatMapIterable, mapIterable } from 'Util/generator'
import Fetch from 'HOC/Fetch'


interface PropBase {
  article: any
}

const Factory = Fetch({
  query: (props: PropBase) => [props.article.tags.map(getProps('tagName'))]
  selector: (state: RootState, tags: string[]) => {
    const curried = callLeft(selectRelatedArticle, state)

    return new Map(flatMapIterable(curried, tags))
  }
})

export default Factory
