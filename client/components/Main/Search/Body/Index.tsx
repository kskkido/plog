import * as React from 'react'
import Filter from 'HOC/Filter'
import { Container, CardContainer } from './Styles'
import { createFactory } from './util.tsx'
import Cards from './Cards'

export interface Props {
  generator: Function
}

const Content = ({ generator }: Props) => {

  return (
    <Container>
      <Cards
        createCard={(factory: Function) => generator(factory)}
        createFactory={createFactory}
        width={'100%'}
      />
    </Container>
  )
}

export default Filter(Content)
