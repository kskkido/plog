import styled from 'styled-components'
import { HEIGHT as HEADER_HEIGHT } from '../Header/Styles'

export const MAIN_HEIGHT = 100
export const MAIN_WIDTH = 100
export const OFFSET = 10

export const Main = styled.section`
  padding-top: ${HEADER_HEIGHT}vh;
  height: ${MAIN_HEIGHT}vh;
  width: ${MAIN_WIDTH}%;
  display: flex;
`

export const Body = styled.section`
  padding: 10px;
  height: 100%;
  width: 50%;
`
