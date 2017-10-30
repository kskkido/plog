import * as React from 'react'
import Filter from '../../../HOC/Filter'
import { Container, CardContainer } from './Styles'
import Card from './Card'

export interface Props {
  generator: Function
}

const createCard = (entry: any, i: number) => <Card key={'admin_' + entry.data.id} payload={entry} />

const Body = ({ generator }: Props) => {

  return (
    <Container>
      <CardContainer>
        {Array.from(generator(createCard))}
      </CardContainer>
    </Container>
  )
}

export default Filter(Body)
