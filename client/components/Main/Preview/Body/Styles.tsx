import styled from 'styled-components'
import { MAIN_HEIGHT } from '../Styles'
import { HEIGHT as FOOTER_HEIGHT } from '../Footer/Styles'

export const HEIGHT = 100
export const WIDTH = 90
export const OFFSET = 10

export const Container = styled.section`
  margin-left: ${OFFSET}vw;
  height: auto;
  min-width: ${WIDTH}%;
  overflow: hidden;
`

export interface Props {
  previewCount?: number,
  [s: string]: any
}

export const SubSection = styled.section`
  margin-bottom: ${FOOTER_HEIGHT + 10}vh;
  height: ${MAIN_HEIGHT - FOOTER_HEIGHT}vh;
  min-width: ${(props: Props) => 100 * (props.previewCount || 1)}%;
  display: flex;
`

export const SubContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
`
