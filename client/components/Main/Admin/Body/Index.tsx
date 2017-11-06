import * as React from 'react'
import Filter from 'HOC/Filter'
import { Container, CardContainer } from './Styles'
import Cards from './Cards'

export interface Props {
  generator: Function
}

const Body = ({ generator }: Props) => (
  <Container>
    <Cards
      createCard={(Factory: Function) => generator(Factory)}
      createFactory={(Card: any) => (entry: any, i: number) => <Card key={'admin_' + entry.data.id} payload={entry} /> }
    />
  </Container>
)


export default Filter(Body)
