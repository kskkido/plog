import * as React from 'react'

export const toHash = (arr: any[]) => (
  arr.reduce((hash, el, i) => (hash[el] = i, hash), {})
)

export const toArray = (iterable: ArrayLike<any>) => Array.from(iterable)
