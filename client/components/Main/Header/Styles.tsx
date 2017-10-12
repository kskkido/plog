import styled from 'styled-components'

export const HEIGHT = 10
export const WIDTH = 100
export const OFFSET= 10 //should come from main styles

const SubContainer = styled.section`
  text-align: center;
  position: absolute;
  height: 100%;
  width: ${OFFSET}%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Container = styled.section`
  position: fixed;
  height: ${HEIGHT}%;
  width: ${WIDTH}vw;
  z-index: 2;
`

export const LogoContainer = SubContainer.extend`
  left: 0;
`

export const CollapsibleContainer = SubContainer.extend`
  right: 0;
`

export const ButtonContainer = styled.div`
  cursor: pointer
`
