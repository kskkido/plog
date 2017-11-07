import * as React from 'react'
import { filterStream, mapStream, Query } from './util'

export interface Props {
  data: any[]
  query?: Query
}

const Factory = (Base: any) => ({ data, query }: Props) =>
  query ?
    <Base generator={mapStream(filterStream(query)(data))} /> :
    <Base generator={mapStream(data)} />
export default Factory
