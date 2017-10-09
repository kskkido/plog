import { NAVIGATION, navigation } from './'
import { getFirst, Publisher }  from './util'


class NavStore extends Publisher {
  private data: navigation
  private main: string

  constructor(data: navigation) {
    super()

    this.data = data
    this.main = getFirst(data)
  }

  getIndex (key: string) {
    const keyData = this.data.get(key)

    if (!keyData) {
      throw Error(key + 'key does not exist')
    } else {
      return keyData.activeIndex
    }
  }

  setIndex (key: string, index: number) {
    const keyData = this.data.get(key)

    if (!keyData) {
      throw Error(key + 'key does not exist')
    } else {
      keyData.activeIndex = index
      this.dispatch(key, index)
    }
  }

  getMain() {
    return this.main
  }

  setMain (key:string) {
    if (!this.check(key)) {
      throw new Error(key + 'key does not exist')
    } else if (this.main === key) {
      return
    }

    this.main = key
    this.dispatch('MAIN', key)
  }

  getKey () {
    return Array.from(this.data.keys())
  }

  getSublist (key: string) {
    const keyData = this.data.get(key)

    if (!keyData) {
      throw Error(key + 'key does not exist')
    } else {
      return keyData.subList
    }
  }

  setSublist (key:string, subList: string[]) {
    const keyData = this.data.get(key)

    if (!keyData) {
      throw Error(key + 'key does not exist')
    } else {
      keyData.subList = subList
      keyData.activeIndex = 0
      this.dispatch(key, 0)
    }
  }
}

export const NavigationStore = new NavStore(NAVIGATION)
