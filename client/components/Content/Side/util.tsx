import * as React from 'react'
import { TweenLite } from 'gsap'
import { List, ListCell, ListRow } from './Styles'
import { MAIN_HEIGHT } from '../Styles'
import { NavigationStore } from '../../../data/store'

export const toHash = (arr: any[]) => (
  arr.reduce((hash, el, i) => (hash[el] = i, hash), {})
)

export const toArray = (iterable: ArrayLike<any>) => Array.from(iterable)

// export const handleClick = (mainKey: string) => {
//   console.log(TweenLite)
//   NavigationStore.dispatch('MAIN', mainKey)
// }

// export const createTable = (list: string[], activeIndex: number, onClickHandler: Function) =>
//   list.map((item, i) => {
//     const active: boolean = activeIndex === i

//     return (
//       <ListRow
//         key={item + 'side'}
//         active={active}
//         onClick={() => active || onClickHandler(item)}
//       >
//         <ListCell>
//           <span>{item}</span>
//         </ListCell>
//       </ListRow>
//     )
//   })
