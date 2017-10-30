import styled from 'styled-components'

export interface Props {
  active: boolean
}

export const Container = styled.div`
  margin: 5px;
  border-width: 0px 0px 1px 0px;
`

export const Button = styled.span`
  margin: 5px;
  display: inline-block;
  color: ${(props: Props) => props.active ? 'green' : 'white'};
  cursor: pointer;
`
