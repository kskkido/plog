import styled from 'styled-components'
import { MAIN_WIDTH, OFFSET } from '../Styles'

export const Container = styled.section`
  margin-left: ${OFFSET}vw;
  height: auto;
  width: ${MAIN_WIDTH - OFFSET}%;
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
  width: 100%;
  border-width: 0 0 1px 0;
`
