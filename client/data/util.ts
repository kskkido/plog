

const Logger = process.env.NODE_ENV === 'production' ?
  (i: any, ii?: any) => i :
  (fn: Function, type?: string) =>
    function(...args: any[]) {
      let i = 0

      console.log('CALLING', type || 'unnamed function')
      for (i = 0; i < args.length; i += 1) {
        console.log('argument', i, ': ', args[i])
      }
      console.log('COMPLETE', type || 'unnamed function')

      return fn.apply(this, args)
    }

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

  subscribe = Logger(function (type: string, callback: Function) {
    const subscribers = this.subscribers

    this.check(type) || (subscribers[type] = [])
    subscribers[type].push(callback)
    return this.unsubscribe.bind(this, type, callback)
  }, 'SUBSCRIBE')

  unsubscribe = Logger(function (type: string, callback: Function) {
    this.check(type) && this.access('unsubscribe', type, callback)
  }, 'UNSUBSCRIBE')

  dispatch = Logger(function (type: string, ...args: any[]) {
    this.check(type) && this.access('dispatch', type, ...args)
  }, 'DISPATCH')

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
