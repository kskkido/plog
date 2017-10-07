import styled from 'styled-components'
import { HEIGHT as HEADER_HEIGHT } from './Header/Styles'

export const MAIN_HEIGHT = 100 - HEADER_HEIGHT
export const MAIN_WIDTH = 100

export const Container = styled.div`
  width: 100vw;
`

export const Main = styled.section`
  margin-top: ${HEADER_HEIGHT}vh;
  display: inline-block;
  height: ${MAIN_HEIGHT}vh;
  width: ${MAIN_WIDTH}%;
`
