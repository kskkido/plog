import styled from 'styled-components'
import { MAIN_HEIGHT } from '../../Styles'
import { SubContainer } from '../Styles'
import { HEIGHT as FOOTER_HEIGHT } from '../../Footer/Styles'

export interface Props {
  previewCount?: number,
  ratio?: number,
  [s: string]: any
}

export const SlideContainer = SubContainer.extend`
  min-width: ${(props: Props) => 100 * (props.previewCount || 1)}%;
  display: flex;
  transform: translate(-${(props: Props) => props.ratio || 0}%, 0);
  transition: transform 0.3s;
`
