import styled from 'styled-components'
import { HEIGHT as HEADER_HEIGHT } from '../Header/Styles'

export const MAIN_HEIGHT = 100 - HEADER_HEIGHT
export const MAIN_WIDTH = 100
export const OFFSET = 10

export const Main = styled.section`
  margin-top: ${HEADER_HEIGHT}vh;
  display: inline-block;
  height: ${MAIN_HEIGHT}vh;
  width: ${MAIN_WIDTH}%;
`

export const Body = styled.section`
  margin-left: ${OFFSET}vw;
  height: auto;
  width: ${MAIN_WIDTH - OFFSET}%;
  overflow: hidden;
`

// export const HeaderContainer = styled.div`

// `

// export const HeaderText = styled.div`

// `

// export const HeaderImage = styled.div`

// `

// export const TagContainer = styled.div`
// `

// export const SideContainer = styled.div`

// `
