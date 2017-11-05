export const getFirst = (map: Map<any, any>) => map.keys().next().value

export const getKey = (key: string, map: Map<any, any>) => {
  const property = map.get(key)

  if (typeof property === 'undefined') {
    throw Error ('Property ' + property + 'does not exist in' + map)
  } else {
    return property
  }
}

export const getProps = (property: string) => (state: any) => state[property]
