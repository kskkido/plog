import * as React from 'react'
import { callLeft, callRight, compose, mapWith } from 'Util/decorator'
import { filterIterable, mapIterable } from 'Util/generator'
import { getProps } from 'Util/getter'

export interface Query {
  tags: string[],
  title: string
}

// GETTER
const getTagNames = mapWith(getProps('tagName'))
const getTags = compose(getTagNames, getProps('tags'), getProps('data'))
const getTitle = compose(getProps('title'), getProps('data'))

// MATCH
const matchTags = (queries: string[], tags: string[]) =>
  queries.length === 0 || queries.every((query: string) => tags.indexOf(query) > -1)
const matchTitle = (query: string, title: string) =>
  !query || title.match(new RegExp(query, 'i'))
const matchQuery = ({ tags, title }: Query) => (data: any) =>
  matchTitle(title, getTitle(data)) && matchTags(tags, getTags(data))

// PUBLIC
export const filterStream = (data: any, query: Query) => filterIterable(matchQuery(query), data)

export const createFactory = (Card: any) =>
  compose(
    (entry: any) => <Card key={entry.id} payload={entry} />,
    getProps('data')
  )
