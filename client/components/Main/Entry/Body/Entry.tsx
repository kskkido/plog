import * as React from 'react'
import { convertFromRaw, convertToRaw } from 'draft-js'
import { stateToHTML } from 'draft-js-export-html'
import { stateFromHTML } from 'draft-js-import-html'
import { EntryContainer as Container, Content, Image, Header, Title, Meta } from './Styles'
import Fade from 'Transition/Fade'
import Parser from 'HOC/Parser'

export interface Props {
  article: any
}

const Entry = (props: Props) => {
  const { article } = props
  const Parse = Parser()

  return (
    <Container>
      <Image className="onEnter"/>
      <Header className="onEnter">
        <Title>{article.title}</Title>
        <Meta>{article.date.slice(0, 10)}</Meta>
      </Header>
      <Content className="onEnter">
        <Parse html={stateToHTML(article.content)} />
      </Content>
    </Container>
  )
}

export default Fade()(Entry)
