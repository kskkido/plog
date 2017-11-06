export const filterId = (id: string) => (entry: any) => {
  const [key, article] = entry

  return article.data.id !== id
}
