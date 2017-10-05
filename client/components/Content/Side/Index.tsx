import * as React from 'react'
import { Container, List, ListCell, ListRow } from './Styles'
import { NavigationStore } from '../../../data/store'
import { createTable, handleClick, toArray, toHash } from './util'

// global static
const childList = Array.from(NavigationStore.getKey()),
      childHash = toHash(childList)

export interface Props {
  mainKey: string
}

const Side = (props: Props) => {
  const activeIndex = childHash[props.mainKey]

  return (
    <Container>
      <List>
        {createTable(childList, activeIndex, handleClick)}
      </List>
    </Container>
  )
}

export default Side
