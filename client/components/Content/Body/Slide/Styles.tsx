import styled from 'styled-components'
import { MAIN_HEIGHT } from '../../Styles'
import { HEIGHT as FOOTER_HEIGHT } from '../../Footer/Styles'

export interface Props {
  previewCount?: number,
  ratio?: number,
  [s: string]: any
}

export const SlideContainer = styled.div.attrs({
  style: (props: Props) => ({
    transform: `translate(-${props.ratio || 0}%, 0)`
  })
})`
  margin-bottom: ${FOOTER_HEIGHT}vh;
  height: ${MAIN_HEIGHT - FOOTER_HEIGHT}vh;
  min-width: ${(props: Props) => 100 * (props.previewCount || 1)}%;
  display: flex;

  transition: transform 0.3s;
`
