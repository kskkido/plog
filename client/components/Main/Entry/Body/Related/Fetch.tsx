import * as React from 'react'
import { selectRelatedArticle } from 'Reducer/selector'
import { RootState } from 'Reducer'
import { callLeft, log } from 'Util/decorator'
import { getProps } from 'Util/getter'
import { flatMapIterable, filterIterable, mapIterable } from 'Util/generator'
import { filterId } from './util'
import Local from 'HOC/Fetch/Local'


interface PropBase {
  article: any
}

const Factory = Local({
  fetch: (state: RootState, tags: string[], id: string) => {
    const select = callLeft(selectRelatedArticle, state)
    const filter = filterId(id)

    return Array.from(filterIterable(filter, flatMapIterable(select, tags)))
  },
  query: (props: PropBase) => [props.article.tags.map(getProps('tagName')), props.article.id]
})

export default Factory
