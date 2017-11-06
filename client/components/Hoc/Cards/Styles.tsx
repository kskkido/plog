import styled from 'styled-components'

interface Props {
  height?: number
  width?: number
}

export const Container = styled.div`
  padding 40px 40px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  height: ${(props: Props) => props.height || 'auto'};
  width: ${(props: Props) => props.width || '80%'};
`

export const Card = styled.div`
  margin: 20px 5px;
  padding: 5px 10px;
  height: 250px;
  width: 35%;
  display: flex;
  flex-direction: column;
  border-width: 1px;
`
