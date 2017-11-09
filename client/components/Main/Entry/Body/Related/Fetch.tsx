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
  fetch: (props: any) => (state: RootState) => {
    const { id, tags } = props
    const select = callLeft(selectRelatedArticle, state)
    const filter = filterId(id)

    return Array.from(filterIterable(filter, flatMapIterable(select, tags)))
  },
  query: (props: PropBase) => ({tags: props.article.tags.map(getProps('tagName')), id: props.article.id})
})

export default Factory
