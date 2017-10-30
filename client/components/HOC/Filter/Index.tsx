import * as React from 'react'
import { filterStream, mapStream, Query } from './util'

export interface Props {
  data: any[]
  query?: Query
}

const Factory = (Wrapped: any) => ({ data, query }: Props) =>
  query ?
    <Wrapped generator={mapStream(filterStream(query)(data))} /> :
    <Wrapped generator={mapStream(data)} />

export default Factory
