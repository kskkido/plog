import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Main } from './Styles'
import Body from './Body'
import Fetch from './Fetch'
import Footer from './Footer'
import Side from './Side'

export interface Props {
  payload: any,
  match?: any,
  location?: any
}

const Entry = (props: Props) => {
  const article = props.payload

  return (
    <Main>
      <Side />
      <Body article={article} />
      <Footer id={article.id}/>
    </Main>
  )
}

export default Fetch(Entry)
