import * as React from 'react'
import { Container } from './Styles'

interface Props {
  createCard: Function,
  createFactory: Function,
  height?: number,
  width?: number,
}

const Factory = (Card: any) => ({ createCard, createFactory, height, width }: Props) => {
  const cardList = createCard(createFactory(Card))

  return (
    <Container height={height} width={width}>
      {Array.isArray(cardList) ? cardList : Array.from(cardList)}
    </Container>
  )
}

export default Factory
