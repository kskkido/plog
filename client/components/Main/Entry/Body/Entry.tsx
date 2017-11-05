import * as React from 'react'
import * as Html from 'html-to-react'
import { EntryContainer as Container, Content, Image, Header, Title, Meta } from './Styles'

export interface Props {
  article: any
}

const htmlToReact = new Html.Parser()

const Entry = (props: Props) => {
  const { article } = props
  const Parsed = htmlToReact.parse(article.content)

  return (
    <Container>
      <Image />
      <Header>
        <Title>{article.title}</Title>
        <Meta>{article.date && article.date.slice(0, 10)}</Meta>
      </Header>
      <Content>
      { Parsed}
      </Content>
    </Container>
  )
}

export default Entry
