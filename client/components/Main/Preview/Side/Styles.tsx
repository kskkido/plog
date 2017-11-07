import styled, { css } from 'styled-components'
import { MAIN_HEIGHT } from '../Styles'
import { OFFSET as SIDE_WIDTH } from '../Body/Styles'

export interface Props {
  active: boolean
}

export const HEIGHT = MAIN_HEIGHT
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
  position: relative;
  padding: 0;
  width: ${NAVIGATION_WIDTH}%;
  display: table-row;
  cursor: ${(props: Props) => props.active ? 'default' : 'pointer'};
`

export const ListCell = styled.div`
  text-align: center;
  vertical-align: middle;
  display: table-cell;
`

export const Slider = styled.div`
  position: absolute;
  height: ${(HEIGHT - 5) / 4}%;
  width: 100%;
  z-index: -1;
`

export const Line = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  height: 30%;
  border: 1px solid white;
  transform: translate(-50%, -50%);
`
