import styled from 'styled-components'
import { OFFSET as SIDE_WIDTH } from '../Styles'

export const HEIGHT = 100
export const WIDTH = SIDE_WIDTH
export const NAVIGATION_WIDTH = 95

export const Container = styled.section`
  position: fixed;
  height: ${HEIGHT}vh;
  width: ${WIDTH}vw;
  overflow-y: scroll;
`

export const List = styled.ul`
  padding: 0;
  margin: auto;
  height: auto%;
  width: ${NAVIGATION_WIDTH}%;
  display: table;
  list-style: none;
`

export const ListRow = styled.li`
  padding: 0;
  height: 80px;
  display: table-row;
  border-width: 0 0 1px 0;
  cursor: pointer;

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
