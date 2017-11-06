import * as React from 'react'
import * as Html from 'html-to-react'

interface Props {
  html: string
}

const Parser = (setup: any) => {
  const ParseApi = new Html.Parser(setup)

  return (props: Props) => ParseApi.parse(props.html)
}

export default Parser
