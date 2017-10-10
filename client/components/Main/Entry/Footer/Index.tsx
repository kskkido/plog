import * as React from 'react'
import { Container, List, ListRow, ListCell } from './Styles'

const Footer = () => {

  return (
    <Container>
      <List>
        <ListRow>
          <ListCell>
            Before
          </ListCell>
        </ListRow>
        <ListRow>
          <ListCell>
            Next
          </ListCell>
        </ListRow>
      </List>
    </Container>
  )
}

export default Footer
