import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'Reducer'
import { CardContainer as Container } from '../Styles'
import Cards from './Cards'
import Fetch from './Fetch'

interface Props {
  payload: Map<any, any>
}

const Related = ({ payload }: Props) => (
  <Cards
    createCard={(factory: Function) => payload.map(factory)}
    createFactory={(Card: any) => ([key, value]: any) => <Card key={key} payload={value} />}
  />
)

export default Fetch(Related)
