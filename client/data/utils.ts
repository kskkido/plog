interface _Publisher {
  subscribers: {
    [s: string]: any[]
  }
}

class _Publisher {
  constructor() {
    Object.assign(this, {
      subscribers: {
        any: []
      }
    })
  }

  subscribe (type: string, callback: Function) {
    const subscribers = this.subscribers

    this.check(type) || (subscribers[type] = [])
    subscribers[type].push(callback)
    return this.unsubscribe.bind(this, type, callback)
  }

  unsubscribe (type: string, callback: Function) {
    this.check(type) && this.access('unsubscribe', type, callback)
  }

  dispatch (type: string, ...args: any[]) {
    this.check(type) && this.access('dispatch', type, ...args)
  }

  access (event: string, type: string, ...args: any[]) {
    const subscribers = this.subscribers[type],
          len = subscribers.length

    for (let i = 0; i < len; i += 1) {
      if (event === 'dispatch') {
        subscribers[i](...args)
      } else if (event === 'unsubscribe') {
        if (args[0] === subscribers[i]) {
          subscribers.splice(i, 1)
        }
      }
    }
  }

  check (type: string): boolean {
    return Array.isArray(this.subscribers[type])
  }
}

export const Publisher = _Publisher

export const getFirst = (map: Map<any, any>) => map.keys().next().value
