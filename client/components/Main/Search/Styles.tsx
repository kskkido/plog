import styled from 'styled-components'
import { HEIGHT as HEADER_HEIGHT } from '../Header/Styles'

export const MAIN_HEIGHT = 100 - HEADER_HEIGHT
export const MAIN_WIDTH = 100
export const OFFSET = 15

export const Main = styled.section`
  margin-top: ${HEADER_HEIGHT}vh;
  height: ${MAIN_HEIGHT}vh;
  width: ${MAIN_WIDTH}%;
  display: inline-block;
`

export const Body = styled.section`
  margin-left: ${OFFSET}vw;
  height: auto;
  width: ${MAIN_WIDTH - OFFSET}%;
  overflow: hidden;
`
