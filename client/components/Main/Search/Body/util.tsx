import * as React from 'react'
import { compose } from 'Util/decorator'
import { getProps } from 'Util/getter'

export const createFactory = (Card: any) =>
  compose(
    (entry: any) => <Card key={entry.id} payload={entry} />,
    getProps('data')
  )
