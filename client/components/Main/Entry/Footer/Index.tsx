import * as React from 'react'
import { Link } from 'react-router-dom'
import { Container, List, ListRow, ListCell } from './Styles'

export interface Props {
  id: number;
}

const Footer = (props: Props) => {
  const { id } = props

  return (
    <Container>
      <List>
        <ListRow>
          <Link to={`/entry/${id - 1}`}>
            <ListCell>
              Before
            </ListCell>
          </Link>
        </ListRow>
        <ListRow>
          <Link to={`/entry/${id + 1}`}>
            <ListCell>
              Next
            </ListCell>
          </Link>
        </ListRow>
      </List>
    </Container>
  )
}

export default Footer
