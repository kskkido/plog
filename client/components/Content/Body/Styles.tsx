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

export const SubContainer = styled.div`
  margin-bottom: ${FOOTER_HEIGHT}vh;
  height: ${MAIN_HEIGHT - FOOTER_HEIGHT}vh;
  min-width: ${(props: Props) => 100 * (props.previewCount || 1)}%;
  display: flex;
`

export const SlideContainer = styled.div`
  margin-bottom: ${FOOTER_HEIGHT}vh;
  height: ${MAIN_HEIGHT - FOOTER_HEIGHT}vh;
  min-width: ${(props: Props) => 100 * (props.previewCount || 1)}%;
  display: flex;
  transform: translate(-${0}%, 0)
`
