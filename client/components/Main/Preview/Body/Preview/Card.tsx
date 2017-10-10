import * as React from 'react'
import { Container, ImageContainer, TextContainer, TextContent, TextHeader } from './Styles'
import { Link } from 'react-router-dom'
import PreviewLink from './Link'

export interface Props {
  activeIndex?: number,
  previewCount?: number,
  inputRef?: Function,
  data?: any,
  image?: string,
}


const Preview = (props: Props) => {
  const { data, local, url } = props.data
  console.log(local, 'what the fuck')
  return (
    <Container previewCount={props.previewCount}>
      <TextContainer>
        <TextHeader>
          {data.title}
        </TextHeader>
        <TextContent>
          {data.content}
        </TextContent>
      </TextContainer>
      <PreviewLink local={local} url={url}>
        <ImageContainer />
      </PreviewLink>
    </Container>
  )
}

export default Preview
