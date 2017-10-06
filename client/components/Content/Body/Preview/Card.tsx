import * as React from 'react'
import { Container, ImageContainer, TextContainer, TextContent, TextHeader } from './Styles'

export interface Props {
  activeIndex?: number,
  previewCount?: number,
  inputRef?: Function,
  text?: {
    header: string,
    content: string,
  },
  image?: string,
}


const Preview = (props: Props) => {

  return (
    <Container previewCount={props.previewCount}>
      <TextContainer>
        <TextHeader>
          HEADER
        </TextHeader>
        <TextContent>
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        </TextContent>
      </TextContainer>
      <ImageContainer />
    </Container>
  )
}

export default Preview