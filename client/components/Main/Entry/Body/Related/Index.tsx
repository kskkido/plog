import * as React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'Reducer'
import { CardContainer as Container } from '../Styles'
import Card from './Card'
import Fetch from './Fetch'

interface Props {
  payload: Map<any, any>
}

const createCard = ([key, value]: any) => <Card key={key} payload={value} />

const Related = (props: Props) => {
  const { payload } = props

  return (
    <Container>
      {Array.from(payload).map(createCard)}
    </Container>
  )
}

export default Fetch(Related)
