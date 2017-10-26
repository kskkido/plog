import styled from 'styled-components'

export interface Props {
  active: boolean
}

export const NAVIGATION_WIDTH = 95

export const List = styled.ul`
  padding: 0;
  margin: auto;
  height: auto%;
  width: ${NAVIGATION_WIDTH}%;
  display: table;
  list-style: none;
`

export const ListRow = styled.li.attrs({
  style: (props: Props) => props.active ?
    {
      backgroundColor: 'grey'
    } :
    {}
})`
  padding: 0;
  height: 80px;
  display: table-row;
  border-width: 0 0 1px 0;
  cursor: pointer;

  &:after {
    content: '';
    height: 1px;
    background-color: white;
    width: ${NAVIGATION_WIDTH}%;
  }
`

export const ListCell = styled.div`
  text-align: center;
  vertical-align: middle;
  display: table-cell;
`
