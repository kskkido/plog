import * as React from 'react'
import { Container, List, ListRow, ListCell } from './Styles'

const Side = () => {

  return (
    <Container>
      <List>
        <ListRow>
          <ListCell>
            Like
          </ListCell>
        </ListRow>
        <ListRow>
          <ListCell>
            Tweet
          </ListCell>
        </ListRow>
        <ListRow>
          <ListCell>
            Share link
          </ListCell>
        </ListRow>
      </List>
    </Container>
  )
}

export default Side
