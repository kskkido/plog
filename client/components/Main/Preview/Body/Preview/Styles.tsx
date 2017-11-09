import styled from 'styled-components'
import { Props } from '../Styles'

/* ======= DIMENSIONS ======= */
export const PREVIEW_HEIGHT = 90
export const PREVIEW_WIDTH = 80
export const PREVIEW_CHILD_HEIGHT = 50
export const PREVIEW_CHILD_WIDTH = 75
export const HORIZONTAL_OFFSET = 50

/* ======= MAIN CONTAINER ======= */
export const Container = styled.div`
  position: relative;
  float: left;
  margin: auto;
  height: ${PREVIEW_HEIGHT}%;
  width: ${(props: Props) => PREVIEW_WIDTH /(props.length || 1)}%;
`

/* ======= TEXT CONTAINER ======= */
export const TextContainer = styled.div`
  position: absolute;
  left: ${HORIZONTAL_OFFSET}px;
  bottom: 0;
  padding-top: 10px;
  height: ${PREVIEW_CHILD_HEIGHT}%;
  width: ${PREVIEW_CHILD_WIDTH}%;
  display: block;
  overflow-Y: hidden;
  z-index: 1;
`

export const TextHeader = styled.h1`
  padding-left: 20px;
`

export const TextContent = styled.p`
  padding-top: 20px;
`

/* ======= IMAGE CONTAINER ======= */
export const ImageContainer = styled.div`
  position: absolute;
  right: ${HORIZONTAL_OFFSET}px;
  top; 0;
  height: ${PREVIEW_CHILD_HEIGHT + 15}%;
  width: ${PREVIEW_CHILD_WIDTH}%;
  border-width: 1px;
  z-index: 0;
`
