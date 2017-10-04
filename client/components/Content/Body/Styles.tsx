import styled from 'styled-components'
import { MAIN_HEIGHT } from '../Styles'

export const HEIGHT = 100
export const WIDTH = 90
export const OFFSET = 10

export const Container = styled.section`
  margin-left: ${OFFSET}vw;
  height: auto;
  width: ${WIDTH}%;
`

export const SubContainer = styled.div`
height: ${MAIN_HEIGHT}vh;
width: 100%;
`
