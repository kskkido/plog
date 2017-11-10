export const

export const filterId = (id: string) => {
  const set = new Set([id])

  return (entry: any) => {
    const [key, article] = entry

    return set.has(key) ?
      false :
      (set.add(key), true)
  }
}
