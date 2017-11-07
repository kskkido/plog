import styled from 'styled-components'
import { OFFSET as SIDE_WIDTH } from '../Body/Styles'

export interface PropsRow {
  active: boolean
}

export const HEIGHT = 10
export const WIDTH = 100

export const Container = styled.section`
  position: fixed;
  bottom: 0;
  height: ${HEIGHT}%;
  width: ${WIDTH}%;
  padding-left: ${10}vw;
  z-index: 1;
`

export const List = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0;
  margin: auto;
  height: 100%;
  width: 100%;
  list-style: none;
`

export const ListRow = styled.li`
  padding: 0;
  flex: 1;
  cursor: pointer;
`

export const ListCell = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Slider = styled.div`
  position: absolute;
  height: 100%;
  width: ${(props) => `${90 / props.length}`}%;
  z-index: -1;
`

export const Line = styled.span`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 40%;
  border: 1px solid white;
  transform: translate(-50%, -50%);
`
