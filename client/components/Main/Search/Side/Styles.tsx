import styled from 'styled-components'
import { OFFSET as SIDE_WIDTH } from '../Styles'

export const HEIGHT = 100
export const WIDTH = SIDE_WIDTH
export const NAVIGATION_WIDTH = 95

export const Container = styled.section`
  position: fixed;
  height: ${HEIGHT}vh;
  width: ${WIDTH}vw;
`

export const List = styled.ul`
  padding: 0;
  margin: auto;
  height: ${HEIGHT - 5}%;
  width: ${NAVIGATION_WIDTH}%;
  display: table;
  list-style: none;
`

export const ListRow = styled.li`
  padding: 0;
  display: table-row;

  &:after {
    content: '';
    height: 1px;
    background-color: white;
    width: ${NAVIGATION_WIDTH}%;
  }
`

export const ListCell = styled.div`
  text-align: center;
  vertical-align: middle;
  display: table-cell;
`
