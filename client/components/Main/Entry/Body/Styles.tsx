import styled from 'styled-components'

const CONTENT_WIDTH = '60%'

export const EntryContainer = styled.div`
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: ${CONTENT_WIDTH};
`

export const Content = styled.div`
  font-size: 1.2em;

  & p {
    line-height: 180%;
  }
`

export const Image = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 30px;
  width: 100%;
  height: 500px;
  display: block;
  border: 1px solid white;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`

export const Title = styled.h1 `
`

export const Meta = styled.h4`
`

export const CardContainer = styled.div`
  padding 40px 40px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;

`
