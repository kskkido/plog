import styled from 'styled-components'
import { MAIN_HEIGHT, MAIN_WIDTH, OFFSET } from '../Styles'

export const Container = styled.section`
  margin-left: ${OFFSET}vw;
  height: auto;
  width: ${MAIN_WIDTH - OFFSET}vw;
  overflow: hidden;
`

export const CardContainer = styled.div`
  padding 10px 20px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`

export const Card = styled.div`
  margin: 20px 5px;
  padding: 5px 10px;
  height: 300px;
  width: 25%;
  border-width: 1px;
`
