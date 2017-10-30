import styled from 'styled-components'
import { MAIN_HEIGHT, OFFSET } from '../Styles'

export interface Props {
  active: boolean
}

export const Container = styled.section`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${MAIN_HEIGHT}vh;
  width: ${OFFSET}vw;
  overflow-y: scroll;
`

export const NAVIGATION_WIDTH = 95

export const List = styled.ul`
  padding: 0;
  height: auto%;
  width: ${NAVIGATION_WIDTH}%;
  display: table;
  list-style: none;
`

export const ListRow = styled.li`
  padding: 0;
  height: 80px;
  display: table-row;
  background-color: ${(props: Props) => props.active ? 'grey' : ''};
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

export const Input = styled.input`
  color: white;
  font-size: 17px;
  margin-top: 20px;
  padding: 5px;
  width: 80%;
  display: block;
  border-width: 0 0 1px 0;
  border-style: solid;
  border-color: white;
  background-color: transparent;
`
