export type navigation = Map<string, {activeIndex: number, subList: string[]}>

export const NAVIGATION: navigation = new Map([
  ['RECENT', {
    activeIndex: 0,
    subList: ['most recent 1', 'most recent 2', 'most recent 3', 'most recent 4']
  }],
  ['ARTICLE', {
    activeIndex: 0,
    subList: ['article1', 'article2', 'article3']
  }],
  ['PROJECT', {
    activeIndex: 0,
    subList: ['Audiosphere', 'Stackquest', 'Portfolio']
  }],
  ['CONTACT', {
    activeIndex: 0,
    subList: ['github', 'linkedin', 'gmail']
  }]
])
